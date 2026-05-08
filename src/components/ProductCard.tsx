"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { aunties } from "@/data/aunties";

interface ProductCardProps {
  product: Product;
  reason?: string;
  theme?: "light" | "dark";
  accent?: string;
  size?: "default" | "compact";
  onOrder?: () => void;
}

const DEFAULT_ACCENT = "#2D1B0E";

function ProductIllustration({ type, color }: { type: string; color: string }) {
  const stroke = color;
  const fill = color + "12";

  switch (type) {
    case "shampoo":
      return (
        <svg width="56" height="74" viewBox="0 0 64 86" fill="none">
          <rect x="14" y="22" width="36" height="56" rx="10" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="22" y="12" width="20" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="25" y="6" width="14" height="9" rx="3" fill={stroke} opacity="0.35"/>
        </svg>
      );
    case "conditioner":
    case "deep-conditioner":
      return (
        <svg width="58" height="68" viewBox="0 0 68 80" fill="none">
          <rect x="12" y="24" width="44" height="48" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="22" y="10" width="24" height="18" rx="7" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="34" cy="19" r="4" fill={stroke} opacity="0.3"/>
        </svg>
      );
    case "curl-cream":
      return (
        <svg width="60" height="60" viewBox="0 0 70 70" fill="none">
          <ellipse cx="35" cy="58" rx="26" ry="6" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="9" y="22" width="52" height="38" rx="9" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <ellipse cx="35" cy="22" rx="26" ry="6" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="35" cy="22" r="5" fill={stroke} opacity="0.3"/>
        </svg>
      );
    case "scalp-serum":
    case "growth-oil":
    case "face-serum":
    case "serum":
      return (
        <svg width="40" height="74" viewBox="0 0 46 86" fill="none">
          <rect x="13" y="32" width="20" height="46" rx="7" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="16" y="18" width="14" height="18" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="23" cy="11" r="5" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <line x1="23" y1="3" x2="23" y2="9" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "scalp-treatment":
      return (
        <svg width="52" height="68" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="30" cy="43" r="8" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.4"/>
          <path d="M30 38 L30 48 M25 43 L35 43" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );
    case "lotion":
      return (
        <svg width="46" height="70" viewBox="0 0 54 82" fill="none">
          <rect x="9" y="22" width="36" height="52" rx="9" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="15" y="9" width="24" height="18" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="21" y="3" width="12" height="10" rx="3" fill={stroke} opacity="0.3"/>
        </svg>
      );
    case "spf":
      return (
        <svg width="36" height="74" viewBox="0 0 42 86" fill="none">
          <rect x="7" y="12" width="28" height="66" rx="9" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="11" y="4" width="20" height="12" rx="5" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <text x="11" y="50" fontFamily="sans-serif" fontSize="11" fill={stroke} fontWeight="700" opacity="0.7">SPF</text>
        </svg>
      );
    case "face-wash":
      return (
        <svg width="44" height="70" viewBox="0 0 52 82" fill="none">
          <path d="M9 36 Q9 24 26 24 Q43 24 43 36 L43 70 Q43 78 26 78 Q9 78 9 70 Z" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="17" y="9" width="18" height="18" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="22" y="3" width="8" height="9" rx="2.5" fill={stroke} opacity="0.3"/>
        </svg>
      );
    case "scar-gel":
      return (
        <svg width="52" height="68" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="9" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        </svg>
      );
    case "accessory":
      return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="22" fill={fill} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="28" cy="28" r="14" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.4"/>
        </svg>
      );
    default:
      return (
        <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
          <rect x="6" y="6" width="44" height="44" rx="11" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        </svg>
      );
  }
}

export default function ProductCard({
  product,
  reason,
  theme = "light",
  accent = DEFAULT_ACCENT,
  size = "default",
  onOrder,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const aunty = aunties.find((a) => a.id === product.auntyId);

  const isCompact = size === "compact";

  const handleClick = async () => {
    if (onOrder) {
      onOrder();
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: [{ productId: product.id, quantity: 1 }] }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="group flex flex-col">
      {/* Illustration area */}
      <div
        className={`relative flex items-center justify-center rounded-2xl ${isCompact ? "py-6" : "py-10"} mb-4 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
        style={{ backgroundColor: accent + "08" }}
      >
        <ProductIllustration type={product.productType} color={accent} />
      </div>

      {/* Info */}
      <div className={`flex flex-col ${isCompact ? "gap-1" : "gap-1.5"}`}>
        {aunty && !isCompact && (
          <p className="font-body text-[10px] font-semibold tracking-[2px] uppercase text-[#9E8C7A]">
            {aunty.name}&apos;s pick
          </p>
        )}
        <h3 className={`font-display font-bold text-[#2D1B0E] leading-snug ${isCompact ? "text-sm" : "text-[15px]"}`}>
          {product.name}
        </h3>

        {reason && (
          <p className="font-body text-xs text-[#6B5040] leading-relaxed">{reason}</p>
        )}

        {!reason && !isCompact && product.painPoint && (
          <p className="font-body text-[13px] text-[#9E8C7A] leading-relaxed line-clamp-2">
            {product.painPoint}
          </p>
        )}

        <div className="flex items-center justify-between mt-1">
          <span className={`font-display font-bold text-[#2D1B0E] ${isCompact ? "text-sm" : "text-base"}`}>
            ${product.price}
          </span>
          <button
            onClick={handleClick}
            disabled={loading}
            className={`font-body font-semibold tracking-[1px] uppercase transition-all disabled:opacity-60 border-b border-[#2D1B0E] hover:opacity-60 ${
              isCompact ? "text-[10px] pb-0.5" : "text-[11px] pb-0.5"
            }`}
            style={{ color: "#2D1B0E" }}
          >
            {loading ? "..." : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
