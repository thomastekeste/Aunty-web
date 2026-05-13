"use client";

import { useState } from "react";
import { getProductById } from "@/data/products";
import AppPreview from "@/components/AppPreview";
import { getAunty } from "@/data/aunties";
import { type TieredMatches, type TeaserVerdict } from "@/data/quiz";
import TierHeader from "./TierHeader";
import TierProductCard from "./TierProductCard";
import CheckoutConfirm from "./CheckoutConfirm";

export default function TieredResults({
  eyebrow, title, accent, journey, tiered, verdicts, onClose, onReset,
}: {
  eyebrow: string; title: string; accent: string;
  journey: "hair" | "skin";
  tiered: TieredMatches;
  verdicts: TeaserVerdict[];
  onClose: () => void; onReset: () => void;
}) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [confirmTier, setConfirmTier] = useState<"basics" | "essentials" | "everything" | null>(null);

  const tierPrice = (items: { productId: string }[]) =>
    items.reduce((sum, m) => sum + (getProductById(m.productId)?.price ?? 0), 0);

  const basicsPrice = tierPrice(tiered.basics);
  const essentialsPrice = tierPrice(tiered.essentials);
  const addonsPrice = tierPrice(tiered.addons);

  const getCartForTier = (tier: "basics" | "essentials" | "everything") =>
    tier === "basics" ? tiered.basics
    : tier === "essentials" ? [...tiered.basics, ...tiered.essentials]
    : [...tiered.basics, ...tiered.essentials, ...tiered.addons];

  const getPriceForTier = (tier: "basics" | "essentials" | "everything") =>
    tier === "basics" ? basicsPrice
    : tier === "essentials" ? basicsPrice + essentialsPrice
    : basicsPrice + essentialsPrice + addonsPrice;

  const getTierLabel = (tier: "basics" | "essentials" | "everything") =>
    tier === "basics" ? "The Basics"
    : tier === "essentials" ? "Basics + Essentials"
    : "The Full Stack";

  const handleCheckout = async (tier: "basics" | "essentials" | "everything") => {
    if (checkingOut) return;
    setCheckingOut(true);
    setCheckoutError(null);
    const cart = getCartForTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: cart.map((m) => ({ productId: m.productId, quantity: 1 })) }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      setCheckoutError(data.error || "Something went wrong. Please try again.");
    } catch {
      setCheckoutError("Connection error. Please check your internet and try again.");
    }
    setCheckingOut(false);
  };

  const CloseBtn = () => (
    <button onClick={onClose} aria-label="Close consultation"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    </button>
  );

  const TierCTA = ({ tier, label, count, price, featured }: {
    tier: "basics" | "essentials" | "everything"; label: string; count: number; price: number; featured?: boolean;
  }) => (
    <div className={`p-5 rounded-2xl mb-10 ${featured ? "border-2" : "bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)]"}`}
      style={featured ? { borderColor: accent, backgroundColor: accent + "08" } : undefined}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-display text-base font-bold text-[#2D1B0E]">{label}</p>
          <p className="font-body text-xs text-[#9E8C7A]">{count} products</p>
        </div>
        <p className="font-display text-2xl font-bold text-[#2D1B0E]">${price}</p>
      </div>
      <button onClick={() => setConfirmTier(tier)} disabled={checkingOut}
        className="w-full py-3.5 rounded-full font-body text-[12px] font-semibold tracking-[1px] uppercase transition-all hover:bg-[#1A0F08] active:scale-[0.98] disabled:opacity-60 bg-[#2D1B0E] text-[#FDFCF8]">
        {label} — ${price}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4 flex-shrink-0">
        <button onClick={onReset}
          className="font-body text-xs text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
          ← Start over
        </button>
        <p className="font-body text-[11px] tracking-[3px] uppercase" style={{ color: accent }}>{eyebrow}</p>
        <CloseBtn />
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-[2.5rem] font-bold text-[#2D1B0E] text-center mb-2 leading-[1.1]">
            {title}
          </h2>
          <p className="font-body text-sm text-[#9E8C7A] text-center mb-8">
            Three tiers. Start with the basics, add on when you&apos;re ready.
          </p>

          {/* Aunty verdicts */}
          {verdicts.length > 0 && (
            <div className="mb-10 space-y-3">
              {verdicts.map((v) => {
                const aunty = getAunty(v.auntyId);
                if (!aunty) return null;
                return (
                  <div key={v.auntyId} className="rounded-xl p-4 flex items-start gap-3"
                    style={{ backgroundColor: aunty.color + "0A", border: `1px solid ${aunty.color}18` }}>
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: aunty.color }}>
                      {aunty.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold mb-0.5" style={{ color: aunty.color }}>
                        The Council
                      </p>
                      <p className="font-display text-sm italic text-[rgba(45,27,14,0.7)] leading-relaxed">
                        &ldquo;{v.message}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Error toast */}
          {checkoutError && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3 animate-fade-in-up">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              <p className="font-body text-sm text-red-800 flex-1">{checkoutError}</p>
              <button onClick={() => setCheckoutError(null)} className="text-red-400 hover:text-red-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          {/* TIER 1: BASICS */}
          <TierHeader number="Tier 1" label="The Basics" accent={accent}
            sublabel={journey === "hair" ? "Your wash day foundation — cleanser, conditioner, styler." : "Cleanser + the core treatments for your skin type."} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.basics.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <TierCTA tier="basics" label="Start with the basics" count={tiered.basics.length} price={basicsPrice} />

          {/* TIER 2: BASICS + ESSENTIALS */}
          <TierHeader number="Tier 2" label="Basics + Essentials" accent={accent}
            sublabel={journey === "hair" ? "Targeted treatments for your specific concerns." : "SPF + targeted serums for your skin's biggest needs."} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.essentials.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <TierCTA tier="essentials" label="Basics + Essentials" count={tiered.basics.length + tiered.essentials.length} price={basicsPrice + essentialsPrice} />

          {/* TIER 3: EVERYTHING */}
          <TierHeader number="Tier 3" label="The Full Stack" accent={accent}
            sublabel="Tools and accessories that amplify everything above." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.addons.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <TierCTA tier="everything" label="Everything — the complete routine"
            count={tiered.basics.length + tiered.essentials.length + tiered.addons.length}
            price={basicsPrice + essentialsPrice + addonsPrice} featured />

          {/* App preview */}
          <div className="border-t border-[rgba(26,15,8,0.06)] pt-8 pb-4 text-center">
            <p className="font-body text-[11px] tracking-[3px] uppercase mb-1" style={{ color: accent }}>Included with every order</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2D1B0E] mb-1">
              Your council, in your pocket.
            </h3>
            <p className="font-body text-sm text-[#6B5040]">
              Track your progress. Chat the council. Get guided through every wash day.
            </p>
          </div>
          <AppPreview hideCta />

          <div className="py-8 text-center">
            <button onClick={onClose}
              className="font-body text-sm text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              Close consultation
            </button>
          </div>
        </div>
      </div>

      {/* Checkout confirmation drawer */}
      {confirmTier && (
        <CheckoutConfirm
          tier={confirmTier}
          tierLabel={getTierLabel(confirmTier)}
          price={getPriceForTier(confirmTier)}
          items={getCartForTier(confirmTier)}
          accent={accent}
          loading={checkingOut}
          onConfirm={() => handleCheckout(confirmTier)}
          onClose={() => { setConfirmTier(null); setCheckingOut(false); }}
        />
      )}
    </div>
  );
}
