import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";

// Required so Next.js doesn't parse the body — Stripe needs the raw bytes
export const runtime = "nodejs";

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
      // 409 = duplicate (already recorded via idempotency), safe to ignore
      const text = await res.text();
      console.error("Supabase insert failed:", res.status, text);
      // Return 500 so Stripe retries — do NOT silently swallow data loss
      return NextResponse.json({ error: "Order recording failed" }, { status: 500 });
    }

    // Send order confirmation email via Resend
    if (email && process.env.RESEND_API_KEY) {
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
  }

  return NextResponse.json({ received: true });
}
