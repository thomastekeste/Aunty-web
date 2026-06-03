/**
 * POST /api/cj/fulfill
 *
 * Called internally by the Stripe webhook after a product purchase.
 * Looks up the Stripe session, maps products to CJ variant IDs,
 * and places the fulfillment order with CJ Dropshipping.
 *
 * NOTE: CJ order creation requires your store to be verified by CJ support.
 * Until verified, orders will be logged but not placed.
 */

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createOrder } from "@/lib/cj";
import { getProductById } from "@/data/products";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function updateCjOrder(
  stripeSessionId: string,
  data: Record<string, unknown>
) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/cj_orders?stripe_session_id=eq.${encodeURIComponent(stripeSessionId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
    }
  );
}

export async function POST(req: NextRequest) {
  // Internal-only endpoint: require the shared secret unconditionally.
  // Origin headers are trivially spoofable / absent on server-to-server
  // calls, so they must NOT be used as an auth bypass.
  const internalSecret = process.env.INTERNAL_API_SECRET;
  if (!internalSecret) {
    console.error("[CJ] INTERNAL_API_SECRET not set — refusing fulfillment");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${internalSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stripeSessionId } = (await req.json()) as { stripeSessionId: string };
  if (!stripeSessionId) {
    return NextResponse.json({ error: "Missing stripeSessionId" }, { status: 400 });
  }

  try {
    // Get full session from Stripe
    const session = await getStripe().checkout.sessions.retrieve(stripeSessionId, {
      expand: ["line_items"],
    });

    const email = session.customer_details?.email ?? session.customer_email ?? "";
    // Stripe moved the collected shipping address to `collected_information`
    // in newer API versions; older versions exposed `shipping_details` directly.
    // Read defensively from either so this keeps working across SDK upgrades.
    type ShippingShape = {
      name?: string | null;
      address?: {
        line1?: string | null;
        line2?: string | null;
        city?: string | null;
        state?: string | null;
        postal_code?: string | null;
        country?: string | null;
      } | null;
    } | null;
    const sessionAny = session as unknown as {
      collected_information?: { shipping_details?: ShippingShape };
      shipping_details?: ShippingShape;
    };
    const shipping: ShippingShape =
      sessionAny.collected_information?.shipping_details ??
      sessionAny.shipping_details ??
      null;

    if (!shipping?.address) {
      console.warn(`[CJ] No shipping address for session ${stripeSessionId} — skipping`);
      await updateCjOrder(stripeSessionId, { status: "no_address" });
      return NextResponse.json({ skipped: "no_address" });
    }

    const productIds = (session.metadata?.productIds ?? "").split(",").filter(Boolean);

    // Map products to CJ variant IDs
    // Products need a cjVariantId field — add these once CJ store is verified
    const cjProducts = productIds
      .map((pid) => {
        const product = getProductById(pid);
        if (!product) return null;
        const cjVid = product.cjVariantId;
        if (!cjVid) return null;
        return { vid: cjVid, quantity: 1, shippingName: "CJPacket Ordinary" };
      })
      .filter(Boolean) as Array<{ vid: string; quantity: number; shippingName: string }>;

    if (cjProducts.length === 0) {
      console.warn(`[CJ] No CJ variant IDs mapped for session ${stripeSessionId}`);
      await updateCjOrder(stripeSessionId, { status: "pending_mapping" });
      return NextResponse.json({ skipped: "no_cj_variants_mapped" });
    }

    const result = await createOrder({
      orderNumber: stripeSessionId,
      shippingAddress: {
        consignee: shipping.name ?? "",
        email,
        phone: session.customer_details?.phone ?? "",
        country: shipping.address.country ?? "US",
        province: shipping.address.state ?? "",
        city: shipping.address.city ?? "",
        address: [shipping.address.line1, shipping.address.line2]
          .filter(Boolean)
          .join(", "),
        zip: shipping.address.postal_code ?? "",
      },
      products: cjProducts,
      remark: `Aunty Council order ${stripeSessionId}`,
    });

    if (result.result) {
      const cjOrderId = result.data?.orderId as string;
      await updateCjOrder(stripeSessionId, {
        status: "placed",
        cj_order_id: cjOrderId,
        cj_order_number: result.data?.orderNum,
      });
      console.log(`[CJ] Order placed: ${cjOrderId}`);
    } else {
      console.error(`[CJ] Order failed:`, result.message);
      await updateCjOrder(stripeSessionId, {
        status: "failed",
        cj_order_id: null,
      });
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[CJ] Fulfill error:", err);
    await updateCjOrder(stripeSessionId, { status: "failed" }).catch(() => {});
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
  }
}
