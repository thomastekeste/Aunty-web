import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { PLANS, type PlanKey } from "@/lib/plans";
import SignOutButton from "./SignOutButton";

export const metadata: Metadata = {
  title: "Your Account — Aunty Council",
  description: "Manage your Aunty Council membership.",
};

interface FoundingOrder {
  id: string;
  email: string;
  plan: string;
  amount_cents: number;
  currency: string;
  created_at: string;
}

async function getOrders(email: string): Promise<FoundingOrder[]> {
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

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getOrders(user.email!);

  return (
    <main className="min-h-screen bg-[#FDFCF8] noise flex flex-col">
      {/* Soft glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[150px] pointer-events-none" />

      {/* Top nav */}
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
          {/* Heading */}
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-3">
            Your account
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-2 leading-tight">
            Founding Member
          </h1>
          <p className="font-body text-[rgba(26,15,8,0.55)] text-sm mb-10">
            {user.email}
          </p>

          {/* Orders */}
          {orders.length > 0 ? (
            <div className="space-y-4 mb-10">
              <p className="font-body text-xs uppercase tracking-[2px] text-[rgba(26,15,8,0.35)]">
                {orders.length === 1 ? "Your order" : "Your orders"}
              </p>

              {orders.map((order) => {
                const planData = PLANS[order.plan as PlanKey] ?? null;
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
                          {planData ? planData.name : order.plan}
                        </p>
                        {planData && (
                          <p className="font-body text-xs text-[rgba(26,15,8,0.45)] mt-0.5">
                            {planData.description}
                          </p>
                        )}
                      </div>
                      <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[rgba(212,160,74,0.12)] font-body text-xs font-semibold text-[#D4A04A]">
                        {planData?.tag ?? "Founding"}
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
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-[rgba(26,15,8,0.08)] p-8 mb-10 text-center" style={{ boxShadow: "0 2px 16px rgba(26,15,8,0.07)" }}>
              <p className="font-body text-[rgba(26,15,8,0.45)] text-sm">
                No orders found for this account.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/api/customer-portal"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Manage subscription
            </Link>
            <Link
              href="/"
              className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors"
            >
              Back to home
            </Link>
          </div>

          {/* Legal footer */}
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
