import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";
import {
  createOrder,
  getProductDetail,
  type CJCreateOrderPayload,
  type CJShippingAddress,
} from "@/lib/cj";
import { getProductById } from "@/data/products";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function supabasePost(table: string, data: Record<string, unknown>) {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
  });
}

async function claimOfferCode(email: string, stripeSessionId: string): Promise<string | null> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/offer_codes?used=eq.false&limit=1&select=id,code`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ id: string; code: string }>;
    if (!rows.length) return null;

    const { id, code } = rows[0];

    const patch = await fetch(
      `${SUPABASE_URL}/rest/v1/offer_codes?id=eq.${id}&used=eq.false`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          used: true,
          assigned_to: email,
          assigned_at: new Date().toISOString(),
          stripe_session_id: stripeSessionId,
        }),
      }
    );
    if (!patch.ok) return null;
    const updated = (await patch.json()) as Array<unknown>;
    if (updated.length > 0) return code;
  }
  return null;
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

    const email = session.customer_details?.email ?? session.customer_email ?? "";
    const plan = (session.metadata?.plan as string) || null;
    const orderType = (session.metadata?.type as string) ?? "plan";
    const amountCents = session.amount_total ?? 0;
    const currency = session.currency ?? "usd";
    const stripeSessionId = session.id;

    // ── Record order ────────────────────────────────────────────────────────
    const res = await supabasePost("founding_orders", {
      email,
      plan,
      stripe_session_id: stripeSessionId,
      amount_cents: amountCents,
      currency,
    });

    if (!res.ok && res.status !== 409) {
      const text = await res.text();
      console.error("Supabase insert failed:", res.status, text);
      return NextResponse.json({ error: "Order recording failed" }, { status: 500 });
    }

    // ── Auto-add buyer to app waitlist ────────────────────────────────────
    if (res.ok && email) {
      await supabasePost("waitlist", { email }).catch(() => {});
    }

    // ── CJ auto-fulfillment (product orders only) ───────────────────────────
    if (res.ok && orderType === "products") {
      const productIds = (session.metadata?.productIds ?? "").split(",").filter(Boolean);
      if (productIds.length > 0) {
        await supabasePost("cj_orders", {
          stripe_session_id: stripeSessionId,
          customer_email: email,
          status: "pending",
        });

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
        const internalSecret = process.env.INTERNAL_API_SECRET ?? "";
        fetch(`${siteUrl}/api/cj/fulfill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${internalSecret}`,
          },
          body: JSON.stringify({ stripeSessionId }),
        }).catch((e) => console.error("CJ fulfill trigger failed:", e));
      }
    }

    // ── Send confirmation + offer code email ────────────────────────────────
    if (res.ok && email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const amountFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amountCents / 100);

      let offerCode: string | null = null;
      try {
        offerCode = await claimOfferCode(email, stripeSessionId);
      } catch (e) {
        console.error("Offer code claim failed:", e);
      }

      const offerCodeBlock = offerCode
        ? `
          <div style="margin:28px 0;padding:20px 24px;background:#FEF8EC;border:1.5px solid #D4A04A;border-radius:14px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#9E8C7A;text-transform:uppercase;letter-spacing:2px;">Your gift</p>
            <p style="margin:0 0 12px;font-size:18px;font-weight:700;color:#1A0F08;">20% off your first month of Aunty Curl</p>
            <p style="margin:0 0 16px;font-size:13px;color:#6B5040;">Our gift to you — 20% off month one. Redeem in the App Store:</p>
            <div style="background:#1A0F08;border-radius:10px;padding:12px 16px;display:inline-block;">
              <span style="font-family:monospace;font-size:17px;font-weight:700;color:#D4A04A;letter-spacing:2px;">${offerCode}</span>
            </div>
            <p style="margin:12px 0 0;font-size:11px;color:#9E8C7A;">Open the App Store → Redeem Gift Card or Code → paste above</p>
          </div>
        `
        : "";

      await resend.emails.send({
        from: "Aunty Council <orders@auntycurlcouncil.com>",
        to: [email],
        subject: offerCode
          ? "Your order + 20% off your first month of Aunty Curl 🎁"
          : "Your Aunty Council order is confirmed!",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FDFCF8;color:#2D1B0E;">
            <img src="https://auntycurlcouncil.com/logo.png" alt="Aunty Council" style="height:36px;margin-bottom:28px;" />
            <h1 style="font-size:22px;margin:0 0 8px;font-weight:700;">Order confirmed ✓</h1>
            <p style="color:#6B5040;margin:0 0 24px;">Thank you — we received your payment of <strong>${amountFormatted}</strong>. Your items are being prepared for shipment.</p>
            <table style="width:100%;border-top:1px solid #E8E2D9;padding-top:16px;">
              <tr><td style="color:#9E8C7A;font-size:12px;padding-bottom:4px;">Order ID</td></tr>
              <tr><td style="font-family:monospace;font-size:13px;">${stripeSessionId}</td></tr>
            </table>
            ${offerCodeBlock}
            <p style="margin-top:24px;color:#6B5040;font-size:14px;">We'll send tracking updates to this email. Reply to any questions.</p>
            <p style="margin-top:32px;font-size:13px;color:#9E8C7A;">With love,<br/>The Aunty Council</p>
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid #E8E2D9;font-size:11px;color:#B0A090;">
              <a href="https://auntycurlcouncil.com/terms" style="color:#B0A090;margin-right:12px;">Terms</a>
              <a href="https://auntycurlcouncil.com/privacy" style="color:#B0A090;margin-right:12px;">Privacy</a>
              <a href="https://auntycurlcouncil.com/refund" style="color:#B0A090;">Refund Policy</a>
            </div>
          </div>
        `,
      }).catch((err: unknown) => console.error("Failed to send confirmation email:", err));
    }
  }

  return NextResponse.json({ received: true });
}
