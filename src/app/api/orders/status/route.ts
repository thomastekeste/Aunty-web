import { NextRequest, NextResponse } from "next/server";
import { getOrderDetail } from "@/lib/cj";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const cjOrderId = req.nextUrl.searchParams.get("cjOrderId");

  if (!cjOrderId) {
    return NextResponse.json({ error: "cjOrderId is required" }, { status: 400 });
  }

  if (!process.env.CJ_EMAIL || !process.env.CJ_API_KEY) {
    return NextResponse.json({ error: "CJ not configured" }, { status: 500 });
  }

  try {
    const result = await getOrderDetail(cjOrderId);
    const data = result?.data;

    // Update Supabase with latest status
    if (data && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_orders?cj_order_id=eq.${encodeURIComponent(cjOrderId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            status: data.orderStatus,
            tracking_number: data.trackNumber || null,
            shipping_carrier: data.logisticName || null,
            updated_at: new Date().toISOString(),
          }),
        }
      ).catch((err) => console.error("Failed to update CJ order status:", err));
    }

    return NextResponse.json({
      orderId: data?.orderId,
      status: data?.orderStatus,
      trackingNumber: data?.trackNumber,
      carrier: data?.logisticName,
    });
  } catch (err) {
    console.error("CJ order query failed:", err);
    return NextResponse.json(
      { error: "Failed to query order status" },
      { status: 500 }
    );
  }
}
