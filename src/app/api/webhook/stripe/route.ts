import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";
import { createOrder, type CJOrderRequest, type CJShippingAddress } from "@/lib/cj";

export const runtime = "nodejs";

async function getCjMapping(productId: string): Promise<{ cj_product_id: string; cj_variant_id: string } | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_product_mappings?product_id=eq.${encodeURIComponent(productId)}&select=cj_product_id,cj_variant_id`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!res.ok) return null;
  const rows = await res.json();
  if (!rows.length || !rows[0].cj_variant_id) return null;
  return rows[0];
}

async function saveCjOrder(stripeSessionId: string, cjOrderId: string, cjOrderNumber: string) {
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
        cj_order_id: cjOrderId,
        cj_order_number: cjOrderNumber,
        status: "pending",
      }),
    }
  ).catch((err) => console.error("Failed to save CJ order:", err));
}

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

    // Insert into Supabase founding_orders using service role key (bypasses RLS)
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

    // Send order confirmation email via Resend (only on first insert, not 409 retries)
    if (res.ok && email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const amountFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amountCents / 100);

      await resend.emails.send({
        from: "Aunty Council <orders@auntycurlcouncil.com>",
        to: [email],
        subject: "Your Aunty Council order is confirmed!",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FDFCF8;color:#2D1B0E;">
            <h1 style="font-size:22px;margin-bottom:8px;">Order confirmed ✓</h1>
            <p style="color:#6B5040;margin-bottom:24px;">Thank you — we received your payment of <strong>${amountFormatted}</strong>.</p>
            <table style="width:100%;border-top:1px solid #E8E2D9;padding-top:16px;">
              <tr><td style="color:#9E8C7A;font-size:12px;padding-bottom:4px;">Order ID</td></tr>
              <tr><td style="font-family:monospace;font-size:13px;">${stripeSessionId}</td></tr>
            </table>
            <p style="margin-top:24px;color:#6B5040;font-size:14px;">We'll send shipping updates to this email. Reply with any questions.</p>
            <p style="margin-top:32px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
          </div>
        `,
      }).catch((err: unknown) => console.error("Failed to send confirmation email:", err));
    }

    // ── CJ Dropshipping order fulfillment ───────────────────────────────────
    const isProductOrder = session.metadata?.type === "products";
    const hasCjCredentials = process.env.CJ_EMAIL && process.env.CJ_API_KEY;

    if (isProductOrder && hasCjCredentials && res.ok) {
      try {
        const productIds = (session.metadata?.productIds ?? "").split(",").filter(Boolean);
        const shipping = session.customer_details;

        if (productIds.length > 0 && shipping?.address) {
          const cjItems: { vid: string; quantity: number }[] = [];

          // Use productIds from metadata + default qty 1 (metadata tracks the product list)
          for (const productId of productIds) {
            const mapping = await getCjMapping(productId);
            if (mapping?.cj_variant_id) {
              cjItems.push({
                vid: mapping.cj_variant_id,
                quantity: 1,
              });
            }
          }

          if (cjItems.length > 0) {
            const addr = shipping.address!;
            const nameParts = (shipping.name ?? "Customer").split(" ");
            const lastName = nameParts.slice(1).join(" ");
            const cjAddress: CJShippingAddress = {
              firstName: nameParts[0] ?? "",
              lastName: lastName ? lastName : (nameParts[0] ?? ""),
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
            await saveCjOrder(stripeSessionId, cjResult.orderId, cjResult.orderNumber);
            console.log(`CJ order created: ${cjResult.orderId} for Stripe session ${stripeSessionId}`);
          }
        }
      } catch (cjErr) {
        // Log but don't fail the webhook — the payment was already recorded
        console.error("CJ order creation failed:", cjErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
