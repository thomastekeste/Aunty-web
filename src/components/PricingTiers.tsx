"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { PLANS, PlanKey } from "@/lib/plans";
import { FOUNDING_SPOTS, YEARLY_SAVINGS_DISPLAY } from "@/lib/constants";

const tierOrder: PlanKey[] = ["monthly", "yearly", "lifetime"];

const tierAccent: Record<PlanKey, string> = {
  monthly: "#2A7B7B",
  yearly: "#D4A04A",
  lifetime: "#C2456E",
};

const tierEmoji: Record<PlanKey, string> = {
  monthly: "Try it out",
  yearly: "Lock in your year",
  lifetime: "Join the family forever",
};

const auntyEndorsements: Record<PlanKey, { name: string; quote: string; initial: string; color: string }> = {
  monthly: {
    name: "Carmen",
    quote: "Start small, mi amor. You'll see why your aunties are worth it.",
    initial: "C",
    color: "#C2456E",
  },
  yearly: {
    name: "Ngozi",
    quote: "One year with us? Baby, your hair won't even recognize itself. In the best way.",
    initial: "N",
    color: "#D4A04A",
  },
  lifetime: {
    name: "Denise",
    quote: "Sugar, this is the one. You invest in yourself once, and we take care of you forever.",
    initial: "D",
    color: "#3D5A99",
  },
};

export default function PricingTiers() {
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prewarm, setPrewarm] = useState<Partial<Record<PlanKey, string>>>({});
  const [confirmPlan, setConfirmPlan] = useState<PlanKey | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (confirmPlan) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [confirmPlan]);

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

  const handleCheckout = useCallback(async (plan: PlanKey) => {
    setLoading(plan);
    setError(null);

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
      } else {
        setLoading(null);
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setLoading(null);
      setError("Connection error. Please check your internet and try again.");
    }
  }, [prewarm]);

  const openConfirm = (plan: PlanKey) => {
    setConfirmPlan(plan);
  };

  return (
    <>
      <section id="pricing" className="py-16 md:py-24 bg-[#FEF8EC] noise relative overflow-hidden" ref={ref}>
        {/* Background glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[150px]" />

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
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A0F08] mb-4 leading-tight">
              Back us early.{" "}
              <br className="hidden md:block" />
              Keep the founding price forever.
            </h2>
            <p className="font-body text-lg text-[rgba(26,15,8,0.55)] max-w-2xl mx-auto">
              Founding Members help us launch. In return, you lock in your price, get
              access before everyone else, and keep perks that never come back.
            </p>

            {/* Scarcity */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,160,74,0.2)] bg-[rgba(212,160,74,0.06)] mt-6">
              <div className="w-2 h-2 rounded-full bg-[#D4A04A] animate-pulse" />
              <p className="font-body text-xs text-[#D4A04A]">
                Limited to the first {FOUNDING_SPOTS} founding members
              </p>
            </div>
          </div>

          {/* Error toast */}
          {error && (
            <div className="mb-6 max-w-lg mx-auto animate-fade-in-up">
              <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <div className="flex-1">
                  <p className="font-body text-sm text-red-800">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Risk reversal bar */}
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
                  <p className="font-body text-sm font-semibold text-[#1A0F08]">100% refund guarantee</p>
                  <p className="font-body text-xs text-[rgba(26,15,8,0.5)]">
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
                  <p className="font-body text-sm font-semibold text-[#1A0F08]">Secure checkout</p>
                  <p className="font-body text-xs text-[rgba(26,15,8,0.5)]">256-bit SSL via Stripe</p>
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
                  <p className="font-body text-sm font-semibold text-[#1A0F08]">Founding price locked</p>
                  <p className="font-body text-xs text-[rgba(26,15,8,0.5)]">Even if public pricing rises</p>
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
              const endorsement = auntyEndorsements[key];

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
                      background: "white",
                      boxShadow: isPopular
                        ? `0 4px 32px ${accent}20`
                        : "0 2px 16px rgba(26,15,8,0.07)",
                      border: isPopular
                        ? `2px solid ${accent}40`
                        : "1px solid rgba(26,15,8,0.08)",
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
                      <h3 className="font-display text-xl font-bold text-[#1A0F08] mb-1">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span
                          className="font-display text-4xl font-bold"
                          style={{ color: accent }}
                        >
                          {plan.display}
                        </span>
                        <span className="font-body text-sm text-[rgba(26,15,8,0.4)]">
                          {key === "lifetime"
                            ? "once"
                            : key === "yearly"
                            ? "/first year"
                            : "/first month"}
                        </span>
                      </div>

                      {/* Savings callout */}
                      {key === "yearly" && (
                        <p className="font-body text-xs font-semibold text-[#1A7A4A] mb-2">
                          Save {YEARLY_SAVINGS_DISPLAY} vs paying monthly
                        </p>
                      )}
                      {key === "lifetime" && (
                        <p className="font-body text-xs font-semibold text-[#C2456E] mb-2">
                          Pays for itself after 3 months
                        </p>
                      )}
                      {key === "monthly" && <div className="mb-2" />}

                      <p className="font-body text-sm text-[rgba(26,15,8,0.4)] mb-5">
                        {plan.description}
                      </p>

                      {/* Aunty endorsement */}
                      <div
                        className="rounded-xl p-3.5 mb-5"
                        style={{ backgroundColor: `${endorsement.color}08`, border: `1px solid ${endorsement.color}15` }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                            style={{ backgroundColor: endorsement.color }}
                          >
                            {endorsement.initial}
                          </div>
                          <span className="font-body text-xs font-semibold" style={{ color: endorsement.color }}>
                            Aunty {endorsement.name}
                          </span>
                        </div>
                        <p className="font-display text-[13px] italic text-[rgba(26,15,8,0.65)] leading-relaxed">
                          &ldquo;{endorsement.quote}&rdquo;
                        </p>
                      </div>

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
                            <span className="font-body text-sm text-[rgba(26,15,8,0.55)]">
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <button
                        onClick={() => openConfirm(key)}
                        disabled={!!loading}
                        className="w-full py-3.5 rounded-full font-body font-bold text-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
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
                        Get {plan.name}
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
            <div className="flex items-center justify-center gap-4 text-[rgba(26,15,8,0.3)]">
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
              className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#1A0F08] transition-colors underline underline-offset-4 decoration-[rgba(26,15,8,0.15)]"
            >
              Not ready? Just notify me at launch →
            </button>
          </div>
        </div>
      </section>

      {/* Checkout confirmation drawer */}
      {confirmPlan && (
        <CheckoutDrawer
          plan={confirmPlan}
          loading={loading === confirmPlan}
          onConfirm={() => handleCheckout(confirmPlan)}
          onClose={() => { setConfirmPlan(null); setLoading(null); }}
        />
      )}
    </>
  );
}

function CheckoutDrawer({
  plan,
  loading,
  onConfirm,
  onClose,
}: {
  plan: PlanKey;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const selectedPlan = PLANS[plan];
  const accent = tierAccent[plan];
  const endorsement = auntyEndorsements[plan];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A0F08]/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md mx-4 mb-0 md:mb-0 bg-white rounded-t-3xl md:rounded-3xl overflow-hidden transition-all duration-300 ease-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
          boxShadow: "0 -8px 40px rgba(26,15,8,0.15)",
        }}
      >
        {/* Accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />

        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 rounded-full bg-[rgba(26,15,8,0.12)]" />
        </div>

        <div className="p-6 pt-4 md:pt-6">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(26,15,8,0.06)] flex items-center justify-center hover:bg-[rgba(26,15,8,0.12)] transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A0F08" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ backgroundColor: `${accent}15` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: accent }}>
                <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1A0F08] mb-1">
              {tierEmoji[plan]}
            </h3>
            <p className="font-body text-sm text-[rgba(26,15,8,0.5)]">
              Review your order before checkout
            </p>
          </div>

          {/* Order summary */}
          <div className="rounded-xl bg-[rgba(26,15,8,0.03)] border border-[rgba(26,15,8,0.08)] p-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-body text-sm font-semibold text-[#1A0F08]">
                  {selectedPlan.name} Plan
                </p>
                <p className="font-body text-xs text-[rgba(26,15,8,0.5)]">
                  Founding Member Access
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold" style={{ color: accent }}>
                  {selectedPlan.display}
                </p>
                <p className="font-body text-[10px] text-[rgba(26,15,8,0.4)]">
                  {plan === "lifetime" ? "one-time" : plan === "yearly" ? "first year" : "first month"}
                </p>
              </div>
            </div>

            <div className="border-t border-[rgba(26,15,8,0.08)] pt-3 space-y-2">
              {selectedPlan.perks.slice(0, 3).map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" style={{ color: accent }}>
                    <path d="M5 13L10 18L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-body text-xs text-[rgba(26,15,8,0.6)]">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aunty quote */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: `${endorsement.color}08`, border: `1px solid ${endorsement.color}12` }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: endorsement.color }}
              >
                {endorsement.initial}
              </div>
              <div>
                <p className="font-body text-xs font-semibold mb-1" style={{ color: endorsement.color }}>
                  Aunty {endorsement.name}
                </p>
                <p className="font-display text-sm italic text-[rgba(26,15,8,0.6)] leading-relaxed">
                  &ldquo;{endorsement.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Confirm CTA */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-4 rounded-full font-body font-bold text-base transition-all duration-200 disabled:opacity-60 mb-3"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
              color: plan === "monthly" ? "#FEF8EC" : "#1A0F08",
              boxShadow: `0 4px 24px ${accent}30`,
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                </svg>
                Connecting to Stripe...
              </span>
            ) : (
              `Confirm — ${selectedPlan.display}`
            )}
          </button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 text-[rgba(26,15,8,0.3)]">
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-body text-[10px]">Stripe secure</span>
            </div>
            <span className="text-[8px]">&middot;</span>
            <span className="font-body text-[10px]">100% refund guarantee</span>
            <span className="text-[8px]">&middot;</span>
            <span className="font-body text-[10px]">Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
