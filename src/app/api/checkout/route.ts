import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PLANS, PlanKey } from "@/lib/plans";
import { isRateLimited } from "@/lib/rateLimit";
import { getProductById } from "@/data/products";

export const runtime = "nodejs";

interface CartItem {
  productId: string;
  quantity?: number;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { plan, email, cart } = body as {
      plan?: string;
      email?: string;
      cart?: CartItem[];
    };

    // ── Cart-based checkout (products) ───────────────────────────────────────
    if (Array.isArray(cart) && cart.length > 0) {
      if (cart.length > 30) {
        return NextResponse.json({ error: "Too many items" }, { status: 400 });
      }

      const lineItems = [];
      for (const item of cart) {
        const product = getProductById(item.productId);
        if (!product) {
          return NextResponse.json(
            { error: `Unknown product: ${item.productId}` },
            { status: 400 }
          );
        }
        const qty = Math.max(1, Math.min(10, Math.floor(item.quantity ?? 1)));
        lineItems.push({
          price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
              description: product.painPoint,
              metadata: { productId: product.id },
            },
          },
          quantity: qty,
        });
      }

      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: email || undefined,
        line_items: lineItems,
        metadata: {
          type: "products",
          productIds: cart.map((c) => c.productId).join(","),
          email: email || "",
        },
        success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/products`,
      });

      return NextResponse.json({ url: session.url });
    }

    // ── Plan-based checkout (memberships) ─────────────────────────────────────
    if (!plan || !PLANS[plan as PlanKey]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const selectedPlan = PLANS[plan as PlanKey];

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: selectedPlan.productId,
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "plan",
        plan,
        email: email || "",
      },
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
