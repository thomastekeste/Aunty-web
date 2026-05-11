"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/data/products";

export default function CheckoutConfirm({
  tier, tierLabel, price, items, accent, loading, onConfirm, onClose,
}: {
  tier: string; tierLabel: string; price: number;
  items: { productId: string; reason: string }[];
  accent: string; loading: boolean;
  onConfirm: () => void; onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-[#1A0F08]/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }} onClick={handleClose} />
      <div className="relative w-full max-w-md mx-4 bg-white rounded-t-3xl md:rounded-3xl overflow-hidden transition-all duration-300 ease-out"
        style={{ transform: visible ? "translateY(0)" : "translateY(100%)", opacity: visible ? 1 : 0, boxShadow: "0 -8px 40px rgba(26,15,8,0.15)" }}>

        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 rounded-full bg-[rgba(26,15,8,0.12)]" />
        </div>

        <div className="p-6 pt-4 md:pt-6 max-h-[80vh] overflow-y-auto">
          <button onClick={handleClose} aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(26,15,8,0.06)] flex items-center justify-center hover:bg-[rgba(26,15,8,0.12)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A0F08" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ backgroundColor: accent + "15" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: accent }}>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-1">
              Review your order
            </h3>
            <p className="font-body text-sm text-[#9E8C7A]">
              {tierLabel}
            </p>
          </div>

          {/* Item list */}
          <div className="rounded-xl bg-[rgba(26,15,8,0.03)] border border-[rgba(26,15,8,0.08)] p-4 mb-5">
            <div className="space-y-2.5">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-body text-sm font-semibold text-[#2D1B0E] truncate">{product.name}</p>
                    </div>
                    <p className="font-body text-sm text-[#6B5040] flex-shrink-0">${product.price}</p>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[rgba(26,15,8,0.08)] mt-3 pt-3 flex items-center justify-between">
              <p className="font-body text-sm font-semibold text-[#2D1B0E]">Total</p>
              <p className="font-display text-xl font-bold" style={{ color: accent }}>${price}</p>
            </div>
          </div>

          {/* CTA */}
          <button onClick={onConfirm} disabled={loading}
            className="w-full py-4 rounded-full font-body font-bold text-sm transition-all duration-200 disabled:opacity-60 mb-3 text-[#FDFCF8]"
            style={{ backgroundColor: "#2D1B0E" }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                </svg>
                Connecting to Stripe...
              </span>
            ) : (
              `Checkout — $${price}`
            )}
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-3 text-[rgba(26,15,8,0.35)]">
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-body text-[10px]">Secure via Stripe</span>
            </div>
            <span className="text-[8px]">&middot;</span>
            <span className="font-body text-[10px]">Free shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
