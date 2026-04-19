import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Welcome, Founding Member — Aunty Curl Council",
  description: "Your Founding Member spot is reserved. Here's what happens next.",
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

async function getSessionDetails(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return {
      email: session.customer_details?.email || session.customer_email || null,
      plan: (session.metadata?.plan as string) || null,
      amount: session.amount_total ?? null,
      currency: session.currency || "usd",
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const details = await getSessionDetails(session_id);

  const amountDisplay =
    details?.amount != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: details.currency.toUpperCase(),
        }).format(details.amount / 100)
      : null;

  return (
    <main className="min-h-screen bg-[#FEF8EC] noise flex flex-col">
      {/* Soft glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[150px] pointer-events-none" />

      {/* Top nav */}
      <header className="relative z-10 backdrop-blur-sm bg-[#FEF8EC]/80 border-b border-[rgba(26,15,8,0.08)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="Aunty Curl Council" width={28} height={28} className="rounded-lg object-cover" />
            <span className="font-display text-base font-bold text-[#D4A04A] group-hover:opacity-80 transition-opacity">
              Aunty Curl Council
            </span>
          </Link>
        </div>
      </header>

      <div className="relative flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-xl w-full text-center">
          {/* Success emblem */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A04A] to-[#B8862E] flex items-center justify-center mb-8 ring-4 ring-[#D4A04A]/10 ring-offset-4 ring-offset-[#FEF8EC]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L10 18L19 7"
                stroke="#1A0F08"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Welcome, Founding Member
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-shimmer mb-5 leading-tight">
            You&rsquo;re in.
          </h1>
          <p className="font-body text-lg text-[rgba(26,15,8,0.65)] mb-10 leading-relaxed">
            Your spot is reserved. The aunties will be ready for you at launch —
            in the coming weeks.
          </p>

          {/* Order summary */}
          {details && (
            <div className="rounded-2xl bg-white border border-[rgba(26,15,8,0.08)] p-6 mb-10 text-left" style={{ boxShadow: '0 2px 16px rgba(26,15,8,0.07)' }}>
              <p className="font-body text-xs uppercase tracking-[2px] text-[rgba(26,15,8,0.35)] mb-4">
                Order summary
              </p>
              <div className="space-y-2 font-body text-sm">
                {details.plan && (
                  <div className="flex justify-between text-[rgba(26,15,8,0.7)]">
                    <span>Plan</span>
                    <span className="text-[#1A0F08] capitalize">{details.plan}</span>
                  </div>
                )}
                {details.email && (
                  <div className="flex justify-between text-[rgba(26,15,8,0.7)]">
                    <span>Email</span>
                    <span className="text-[#1A0F08]">{details.email}</span>
                  </div>
                )}
                {amountDisplay && (
                  <div className="flex justify-between pt-2 border-t border-[rgba(26,15,8,0.08)] mt-2">
                    <span className="text-[rgba(26,15,8,0.7)]">Total paid</span>
                    <span className="text-[#D4A04A] font-semibold">{amountDisplay}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What happens next */}
          <div className="text-left rounded-2xl bg-[rgba(212,160,74,0.06)] border border-[rgba(212,160,74,0.2)] p-6 mb-10">
            <p className="font-display text-lg font-bold text-[#1A0F08] mb-4">
              What happens next
            </p>
            <ol className="space-y-3 font-body text-sm text-[rgba(26,15,8,0.7)]">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A04A] text-[#1A0F08] font-bold text-xs flex items-center justify-center">1</span>
                <span>A receipt from Stripe just hit your inbox.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A04A] text-[#1A0F08] font-bold text-xs flex items-center justify-center">2</span>
                <span>We&rsquo;ll email you the moment beta access opens.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A04A] text-[#1A0F08] font-bold text-xs flex items-center justify-center">3</span>
                <span>Your Founding Member benefits are locked in — price, badge, early access, all of it.</span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Back to home
            </Link>
            <a
              href="mailto:hello@auntycurlcouncil.com"
              className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors"
            >
              Questions? hello@auntycurlcouncil.com
            </a>
          </div>

          {/* Legal footer */}
          <div className="mt-16 pt-8 border-t border-[rgba(26,15,8,0.08)] flex flex-wrap justify-center gap-6 text-xs">
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
