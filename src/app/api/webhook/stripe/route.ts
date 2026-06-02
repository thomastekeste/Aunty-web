import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";
import {
  createOrder,
  getProductDetail,
  type CJOrderRequest,
  type CJShippingAddress,
} from "@/lib/cj";
import { getProductById } from "@/data/products";

export const runtime = "nodejs";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Parse "id:qty,id:qty" from Stripe metadata (new format) or "id,id" (legacy) */
function parseCartItems(metadata: Record<string, string>): { productId: string; quantity: number }[] {
  // New format: cartItems = "satin-bonnet:2,ice-roller:1"
  const cartItems = metadata.cartItems;
  if (cartItems) {
    return cartItems.split(",").filter(Boolean).map((entry) => {
      const [productId, qtyStr] = entry.split(":");
      return { productId, quantity: parseInt(qtyStr, 10) || 1 };
    });
  }
  // Legacy format: productIds = "satin-bonnet,ice-roller"
  const productIds = metadata.productIds;
  if (productIds) {
    return productIds.split(",").filter(Boolean).map((id) => ({ productId: id, quantity: 1 }));
  }
  return [];
}

/** Get CJ variant ID for a product — uses product data first, then CJ API lookup */
async function getCjVariantId(productId: string): Promise<string | null> {
  const product = getProductById(productId);
  if (!product) return null;

  // 1. Already have variant ID mapped
  if (product.cjVariantId) return product.cjVariantId;

  // 2. Have product ID — look up default variant from CJ API
  if (product.cjProductId) {
    try {
      const detail = await getProductDetail(product.cjProductId);
      if (detail.variants?.length > 0) {
        return detail.variants[0].vid;
      }
    } catch (err) {
      console.error(`CJ variant lookup failed for ${productId}:`, err);
    }
  }

  // 3. Try Supabase mapping table as fallback
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_product_mappings?product_id=eq.${encodeURIComponent(productId)}&select=cj_variant_id`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0 && rows[0].cj_variant_id) {
          return rows[0].cj_variant_id;
        }
      }
    } catch {
      // Supabase table may not exist yet — that's fine
    }
  }

  return null;
}

/** Claim one unused offer code from Supabase and assign it to this email */
async function claimOfferCode(email: string): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = {
    "Content-Type": "application/json",
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };

  try {
    // Grab one unused code (oldest first)
    const fetchRes = await fetch(
      `${supabaseUrl}/rest/v1/offer_codes?used=eq.false&order=id.asc&limit=1&select=id,code`,
      { headers }
    );
    if (!fetchRes.ok) return null;
    const rows = await fetchRes.json();
    if (!rows.length) {
      console.warn("Offer codes exhausted — no unused codes left");
      return null;
    }

    const { id, code } = rows[0];

    // Mark it used + assign to this email
    const updateRes = await fetch(
      `${supabaseUrl}/rest/v1/offer_codes?id=eq.${id}`,
      {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({
          used: true,
          assigned_to_email: email,
          assigned_at: new Date().toISOString(),
        }),
      }
    );

    if (!updateRes.ok) {
      console.error("Failed to mark offer code as used:", await updateRes.text());
      return null;
    }

    return code as string;
  } catch (err) {
    console.error("Offer code claim failed:", err);
    return null;
  }
}

async function saveCjOrder(
  stripeSessionId: string,
  email: string,
  cjOrderId: string,
  cjOrderNumber: string,
  itemCount: number
) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;

  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        stripe_session_id: stripeSessionId,
        email,
        cj_order_id: cjOrderId,
        cj_order_number: cjOrderNumber,
        item_count: itemCount,
        status: "pending",
      }),
    }
  ).catch((err) => console.error("Failed to save CJ order:", err));
}

// ── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.customer_details?.email ?? session.customer_email ?? "";
    const plan = (session.metadata?.plan as string) ?? "";
    const amountCents = session.amount_total ?? 0;
    const currency = session.currency ?? "usd";
    const stripeSessionId = session.id;

    // ── Record the order in Supabase ────────────────────────────────────────
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/founding_orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email,
          plan,
          stripe_session_id: stripeSessionId,
          amount_cents: amountCents,
          currency,
        }),
      }
    );

    if (!res.ok && res.status !== 409) {
      const text = await res.text();
      console.error("Supabase insert failed:", res.status, text);
      return NextResponse.json({ error: "Order recording failed" }, { status: 500 });
    }

    // ── Claim an offer code + send confirmation email ─────────────────────────
    if (res.ok && email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const amountFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amountCents / 100);

      // Claim a 50% off App Store offer code for this customer
      const offerCode = await claimOfferCode(email);

      const offerCodeHtml = offerCode
        ? `
            <div style="margin-top:28px;padding:20px 24px;background:linear-gradient(135deg,#2D1B0E 0%,#3D2A1A 100%);border-radius:16px;color:#FDFCF8;">
              <p style="font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D4A04A;margin:0 0 8px;">Free bonus with your order</p>
              <h2 style="font-size:20px;font-weight:700;margin:0 0 6px;color:#FDFCF8;">50% off the Aunty Curl app</h2>
              <p style="font-size:13px;color:rgba(253,252,248,0.6);margin:0 0 16px;">Daily hair coaching from 7 culturally-aware aunties — personalized to your curl type.</p>
              <div style="background:rgba(253,252,248,0.1);border:1px dashed rgba(212,160,74,0.4);border-radius:10px;padding:12px 16px;text-align:center;">
                <p style="font-size:10px;color:rgba(253,252,248,0.5);margin:0 0 4px;">Your offer code</p>
                <p style="font-size:24px;font-weight:800;letter-spacing:3px;color:#D4A04A;margin:0;font-family:monospace;">${offerCode}</p>
              </div>
              <p style="font-size:11px;color:rgba(253,252,248,0.4);margin:12px 0 0;text-align:center;">Redeem in the App Store when you subscribe</p>
            </div>`
        : "";

      const emailSubject = offerCode
        ? "Your order + 50% off the Aunty Curl app 🎁"
        : "Your Aunty Council order is confirmed!";

      await resend.emails.send({
        from: "Aunty Council <orders@auntycurlcouncil.com>",
        to: [email],
        subject: emailSubject,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FDFCF8;color:#2D1B0E;">
            <h1 style="font-size:22px;margin-bottom:8px;">Order confirmed ✓</h1>
            <p style="color:#6B5040;margin-bottom:24px;">Thank you — we received your payment of <strong>${amountFormatted}</strong>.</p>
            <table style="width:100%;border-top:1px solid #E8E2D9;padding-top:16px;">
              <tr><td style="color:#9E8C7A;font-size:12px;padding-bottom:4px;">Order ID</td></tr>
              <tr><td style="font-family:monospace;font-size:13px;">${stripeSessionId}</td></tr>
            </table>
            <p style="margin-top:24px;color:#6B5040;font-size:14px;">We'll send shipping updates to this email. Reply with any questions.</p>
            ${offerCodeHtml}
            <p style="margin-top:32px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
          </div>
        `,
      }).catch((err: unknown) => console.error("Failed to send confirmation email:", err));
    }

    // ── AUTO-PURCHASE from CJ Dropshipping ──────────────────────────────────
    const isProductOrder = session.metadata?.type === "products";
    const hasCjCredentials = process.env.CJ_EMAIL && process.env.CJ_API_KEY;

    if (isProductOrder && hasCjCredentials && res.ok) {
      try {
        const cartItems = parseCartItems(session.metadata ?? {});
        const shipping = session.customer_details;

        if (cartItems.length > 0 && shipping?.address) {
          // Resolve CJ variant IDs for each cart item
          const cjItems: { vid: string; quantity: number }[] = [];
          const skippedItems: string[] = [];

          for (const item of cartItems) {
            const vid = await getCjVariantId(item.productId);
            if (vid) {
              cjItems.push({ vid, quantity: item.quantity });
            } else {
              skippedItems.push(item.productId);
            }
          }

          if (skippedItems.length > 0) {
            console.warn(`CJ: skipped products without variant mapping: ${skippedItems.join(", ")}`);
          }

          if (cjItems.length > 0) {
            const addr = shipping.address!;
            const nameParts = (shipping.name ?? "Customer").split(" ");
            const lastName = nameParts.slice(1).join(" ");

            const cjAddress: CJShippingAddress = {
              firstName: nameParts[0] ?? "",
              lastName: lastName || (nameParts[0] ?? ""),
              phone: shipping.phone ?? "",
              email,
              country: addr.country ?? "US",
              province: addr.state ?? "",
              city: addr.city ?? "",
              address: [addr.line1, addr.line2].filter(Boolean).join(", "),
              zip: addr.postal_code ?? "",
            };

            const cjOrder: CJOrderRequest = {
              orderNumber: stripeSessionId,
              shippingAddress: cjAddress,
              products: cjItems,
            };

            const cjResult = await createOrder(cjOrder);
            await saveCjOrder(stripeSessionId, email, cjResult.orderId, cjResult.orderNumber, cjItems.length);

            console.log(
              `CJ auto-purchase: order ${cjResult.orderId} created for ${cjItems.length} items ` +
              `(${skippedItems.length} skipped) — Stripe session ${stripeSessionId}`
            );
          }
        }
      } catch (cjErr) {
        // Log but don't fail the webhook — the payment was already recorded
        console.error("CJ auto-purchase failed:", cjErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
