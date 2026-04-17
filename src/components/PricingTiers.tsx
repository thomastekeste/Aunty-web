"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { PLANS, PlanKey } from "@/lib/plans";

const tierOrder: PlanKey[] = ["monthly", "yearly", "lifetime"];

const tierAccent: Record<PlanKey, string> = {
  monthly: "#2A7B7B",
  yearly: "#D4A04A",
  lifetime: "#C2456E",
};

export default function PricingTiers() {
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [prewarm, setPrewarm] = useState<Partial<Record<PlanKey, string>>>({});
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Pre-create the checkout session on hover so redirect is instant on click
  const handleHover = async (plan: PlanKey) => {
    if (prewarm[plan] || loading) return;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        setPrewarm((prev) => ({ ...prev, [plan]: data.url }));
      }
    } catch {
      // silent — fallback to on-click fetch
    }
  };

  const handleCheckout = async (plan: PlanKey) => {
    setLoading(plan);
    // Use pre-warmed URL if available
    if (prewarm[plan]) {
      window.location.href = prewarm[plan]!;
      return;
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#1A0F08] noise relative overflow-hidden" ref={ref}>
      {/* Background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4A04A] opacity-[0.03] blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#C2456E] opacity-[0.02] blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Become a Founding Member
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FEF8EC] mb-4 leading-tight">
            Back us early.{" "}
            <br className="hidden md:block" />
            Keep the founding price forever.
          </h2>
          <p className="font-body text-lg text-[rgba(254,248,236,0.55)] max-w-2xl mx-auto">
            Founding Members help us launch. In return, you lock in your price, get
            access before everyone else, and keep perks that never come back.
          </p>

          {/* Scarcity */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,160,74,0.2)] bg-[rgba(212,160,74,0.06)] mt-6">
            <div className="w-2 h-2 rounded-full bg-[#D4A04A] animate-pulse" />
            <p className="font-body text-xs text-[#D4A04A]">
              Limited to the first 500 founding members
            </p>
          </div>
        </div>

        {/* Risk reversal bar — our promise */}
        <div
          className="relative mb-8 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(42, 123, 123, 0.12) 0%, rgba(212, 160, 74, 0.12) 50%, rgba(194, 69, 110, 0.12) 100%)",
            border: "1px solid rgba(212, 160, 74, 0.2)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[rgba(42,123,123,0.18)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5FB8B8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-[#FEF8EC]">100% refund guarantee</p>
                <p className="font-body text-xs text-[rgba(254,248,236,0.5)]">
                  If we don&rsquo;t launch in the coming weeks.{" "}
                  <a href="/refund" className="text-[#D4A04A] hover:underline underline-offset-2">
                    See policy →
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[rgba(212,160,74,0.18)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A04A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-[#FEF8EC]">Secure checkout</p>
                <p className="font-body text-xs text-[rgba(254,248,236,0.5)]">256-bit SSL via Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[rgba(194,69,110,0.18)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E879A4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-[#FEF8EC]">Founding price locked</p>
                <p className="font-body text-xs text-[rgba(254,248,236,0.5)]">Even if public pricing rises</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tierOrder.map((key, i) => {
            const plan = PLANS[key];
            const accent = tierAccent[key];
            const isPopular = key === "yearly";
            const isLoading = loading === key;

            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleHover(key)}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(32px)",
                  transition: `all 0.6s ease-out ${i * 100}ms`,
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full font-body text-xs font-bold text-[#1A0F08]"
                    style={{ backgroundColor: accent }}
                  >
                    {plan.tag}
                  </div>
                )}

                <div
                  className={`rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                    isPopular ? "ring-2" : ""
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: isPopular
                      ? `2px solid ${accent}40`
                      : "1px solid rgba(254,248,236,0.06)",
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, ${accent}60)`,
                    }}
                  />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Tag (non-popular) */}
                    {!isPopular && (
                      <span
                        className="self-start px-3 py-1 rounded-full font-body text-[10px] font-semibold mb-4"
                        style={{
                          color: accent,
                          backgroundColor: `${accent}15`,
                        }}
                      >
                        {plan.tag}
                      </span>
                    )}
                    {isPopular && <div className="h-6" />}

                    {/* Plan name */}
                    <h3 className="font-display text-xl font-bold text-[#FEF8EC] mb-1">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span
                        className="font-display text-4xl font-bold"
                        style={{ color: accent }}
                      >
                        {plan.display}
                      </span>
                      <span className="font-body text-sm text-[rgba(254,248,236,0.35)]">
                        {key === "lifetime"
                          ? "once"
                          : key === "yearly"
                          ? "/first year"
                          : "/first month"}
                      </span>
                    </div>

                    <p className="font-body text-sm text-[rgba(254,248,236,0.4)] mb-6">
                      {plan.description}
                    </p>

                    {/* Perks */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: accent }}
                          >
                            <path
                              d="M5 13L10 18L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="font-body text-sm text-[rgba(254,248,236,0.55)]">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => handleCheckout(key)}
                      disabled={isLoading || loading !== null}
                      className="w-full py-3.5 rounded-full font-body font-bold text-sm transition-all duration-200 disabled:opacity-50"
                      style={
                        isPopular
                          ? {
                              background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
                              color: "#1A0F08",
                              boxShadow: `0 4px 20px ${accent}30`,
                            }
                          : {
                              border: `1.5px solid ${accent}40`,
                              color: accent,
                              backgroundColor: `${accent}08`,
                            }
                      }
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray="40 60"
                            />
                          </svg>
                          Redirecting...
                        </span>
                      ) : (
                        `Get ${plan.name}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust line */}
        <div
          className="text-center mt-10"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease-out 400ms",
          }}
        >
          <div className="flex items-center justify-center gap-4 text-[rgba(254,248,236,0.3)]">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-body text-xs">Secure checkout via Stripe</span>
            </div>
            <span>&middot;</span>
            <span className="font-body text-xs">Cancel anytime before launch</span>
          </div>
        </div>

        {/* Free option */}
        <div className="text-center mt-6">
          <button
            onClick={() =>
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-body text-sm text-[rgba(254,248,236,0.35)] hover:text-[#FEF8EC] transition-colors underline underline-offset-4 decoration-[rgba(254,248,236,0.15)]"
          >
            Not ready? Just notify me at launch →
          </button>
        </div>
      </div>
    </section>
  );
}
