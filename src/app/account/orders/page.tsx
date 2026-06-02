import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "../SignOutButton";

export const metadata: Metadata = {
  title: "Your Orders — Aunty Council",
  description: "Track your Aunty Council orders and shipments.",
};

interface OrderRow {
  id: string;
  email: string;
  plan: string;
  stripe_session_id: string;
  amount_cents: number;
  currency: string;
  created_at: string;
}

interface CjOrderRow {
  id: string;
  stripe_session_id: string;
  cj_order_id: string;
  cj_order_number: string;
  status: string;
  tracking_number: string | null;
  shipping_carrier: string | null;
  updated_at: string;
}

async function getOrders(email: string): Promise<OrderRow[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/founding_orders?email=eq.${encodeURIComponent(email)}&order=created_at.desc`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  return res.json();
}

async function getCjOrders(sessionIds: string[]): Promise<Map<string, CjOrderRow>> {
  if (sessionIds.length === 0) return new Map();

  const filter = sessionIds.map((id) => `"${id}"`).join(",");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cj_orders?stripe_session_id=in.(${filter})`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return new Map();
  const rows: CjOrderRow[] = await res.json();
  return new Map(rows.map((r) => [r.stripe_session_id, r]));
}

function getStatusDisplay(status: string) {
  switch (status) {
    case "pending":
      return { label: "Processing", color: "bg-[rgba(212,160,74,0.12)] text-[#D4A04A]" };
    case "shipped":
      return { label: "Shipped", color: "bg-[rgba(76,153,96,0.12)] text-[#4C9960]" };
    case "delivered":
      return { label: "Delivered", color: "bg-[rgba(76,153,96,0.15)] text-[#3A7A4A]" };
    case "cancelled":
      return { label: "Cancelled", color: "bg-[rgba(194,69,110,0.12)] text-[#C2456E]" };
    default:
      return { label: "Confirmed", color: "bg-[rgba(212,160,74,0.12)] text-[#D4A04A]" };
  }
}

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getOrders(user.email!);
  const sessionIds = orders.map((o) => o.stripe_session_id).filter(Boolean);
  const cjOrders = await getCjOrders(sessionIds);

  return (
    <main className="min-h-screen bg-[#FDFCF8] noise flex flex-col">
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[150px] pointer-events-none" />

      <header className="relative z-10 backdrop-blur-sm bg-[#FDFCF8]/80 border-b border-[rgba(26,15,8,0.08)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png"
              alt="Aunty Council"
              width={28}
              height={28}
              className="rounded-lg object-cover"
            />
            <span className="font-display text-base font-bold text-[#D4A04A] group-hover:opacity-80 transition-opacity">
              Aunty Council
            </span>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <div className="relative flex-1 px-6 py-12 md:py-20">
        <div className="max-w-xl mx-auto">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-3">
            Order history
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-2 leading-tight">
            Your Orders
          </h1>
          <p className="font-body text-[rgba(26,15,8,0.55)] text-sm mb-10">
            {user.email}
          </p>

          {orders.length > 0 ? (
            <div className="space-y-4 mb-10">
              {orders.map((order) => {
                const cj = cjOrders.get(order.stripe_session_id);
                const status = getStatusDisplay(cj?.status ?? "confirmed");
                const amountDisplay = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: (order.currency ?? "usd").toUpperCase(),
                }).format(order.amount_cents / 100);
                const dateDisplay = new Date(order.created_at).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                );

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl bg-white border border-[rgba(26,15,8,0.08)] p-6"
                    style={{ boxShadow: "0 2px 16px rgba(26,15,8,0.07)" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-display font-bold text-[#2D1B0E] text-lg leading-tight">
                          Order
                        </p>
                        <p className="font-body text-xs text-[rgba(26,15,8,0.45)] mt-0.5 font-mono">
                          {order.stripe_session_id.slice(0, 20)}...
                        </p>
                      </div>
                      <span className={`flex-shrink-0 px-2.5 py-1 rounded-full font-body text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="space-y-2 font-body text-sm border-t border-[rgba(26,15,8,0.06)] pt-4">
                      <div className="flex justify-between text-[rgba(26,15,8,0.6)]">
                        <span>Amount paid</span>
                        <span className="text-[#D4A04A] font-semibold">{amountDisplay}</span>
                      </div>
                      <div className="flex justify-between text-[rgba(26,15,8,0.6)]">
                        <span>Date</span>
                        <span className="text-[#2D1B0E]">{dateDisplay}</span>
                      </div>

                      {cj && (
                        <>
                          {cj.tracking_number && (
                            <div className="flex justify-between text-[rgba(26,15,8,0.6)]">
                              <span>Tracking</span>
                              <span className="text-[#2D1B0E] font-mono text-xs">
                                {cj.tracking_number}
                              </span>
                            </div>
                          )}
                          {cj.shipping_carrier && (
                            <div className="flex justify-between text-[rgba(26,15,8,0.6)]">
                              <span>Carrier</span>
                              <span className="text-[#2D1B0E]">{cj.shipping_carrier}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[rgba(26,15,8,0.6)]">
                            <span>Est. delivery</span>
                            <span className="text-[#2D1B0E]">7–14 business days</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="rounded-2xl bg-white border border-[rgba(26,15,8,0.08)] p-8 mb-10 text-center"
              style={{ boxShadow: "0 2px 16px rgba(26,15,8,0.07)" }}
            >
              <p className="font-body text-[rgba(26,15,8,0.45)] text-sm">
                No orders yet. Browse our{" "}
                <Link href="/products" className="text-[#D4A04A] hover:underline">
                  marketplace
                </Link>{" "}
                to get started.
              </p>
            </div>
          )}

          <div className="flex flex-col items-start gap-3">
            <Link
              href="/account"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Back to account
            </Link>
            <Link
              href="/products"
              className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors"
            >
              Continue shopping
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-[rgba(26,15,8,0.08)] flex flex-wrap gap-6 text-xs">
            <Link href="/terms" className="text-[rgba(26,15,8,0.35)] hover:text-[#D4A04A] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-[rgba(26,15,8,0.35)] hover:text-[#D4A04A] transition-colors">
              Privacy
            </Link>
            <Link href="/refund" className="text-[rgba(26,15,8,0.35)] hover:text-[#D4A04A] transition-colors">
              Refund policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
