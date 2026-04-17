import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

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
      // 409 = duplicate (already recorded), safe to ignore
      const text = await res.text();
      console.error("Supabase insert failed:", res.status, text);
      // Return 200 anyway so Stripe doesn't retry — log and move on
    }
  }

  return NextResponse.json({ received: true });
}
