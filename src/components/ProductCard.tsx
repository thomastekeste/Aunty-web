"use client";

import { useRef, useState } from "react";
import type { Product, ProductCategory } from "@/data/products";

interface ProductCardProps {
  product: Product;
  reason?: string;
  size?: "default" | "compact";
  onOrder?: () => void;
}

/* ─── Category-specific theming ──────────────────────────────────────────── */

const CATEGORY_THEME: Record<
  ProductCategory,
  { gradient: string; accent: string; pattern: string }
> = {
  hair: {
    gradient: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 70%, #D4A04A 100%)",
    accent:   "#A0701E",
    pattern:  "#7A5A2A",
  },
  skin: {
    gradient: "linear-gradient(155deg, #F7EDE9 0%, #E8C4B8 65%, #C49185 100%)",
    accent:   "#8B4A3A",
    pattern:  "#6B3A2D",
  },
  accessories: {
    gradient: "linear-gradient(155deg, #E4EDE8 0%, #BFD9C8 65%, #9CB9A7 100%)",
    accent:   "#3F6B52",
    pattern:  "#2D4F3D",
  },
};

/* ─── Product silhouettes ────────────────────────────────────────────────── */

function ProductSilhouette({
  type,
  color,
}: {
  type: string;
  color: string;
}) {
  const stroke = color;
  const fill = `${color}1F`;
  const common = { strokeWidth: 1.6 } as const;

  switch (type) {
    case "shampoo":
      return (
        <svg width="68" height="92" viewBox="0 0 64 86" fill="none">
          <rect x="14" y="22" width="36" height="56" rx="10" fill={fill} stroke={stroke} {...common} />
          <rect x="22" y="12" width="20" height="14" rx="5" fill={fill} stroke={stroke} {...common} />
          <rect x="25" y="6" width="14" height="9" rx="3" fill={stroke} opacity="0.45" />
          <line x1="20" y1="48" x2="44" y2="48" stroke={stroke} strokeOpacity="0.25" strokeWidth="1.2" />
        </svg>
      );
    case "conditioner":
    case "deep-conditioner":
      return (
        <svg width="72" height="86" viewBox="0 0 68 80" fill="none">
          <rect x="12" y="24" width="44" height="48" rx="12" fill={fill} stroke={stroke} {...common} />
          <rect x="22" y="10" width="24" height="18" rx="7" fill={fill} stroke={stroke} {...common} />
          <circle cx="34" cy="19" r="4" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "scalp-serum":
    case "growth-oil":
    case "face-serum":
      return (
        <svg width="48" height="88" viewBox="0 0 46 86" fill="none">
          <rect x="13" y="32" width="20" height="46" rx="7" fill={fill} stroke={stroke} {...common} />
          <rect x="16" y="18" width="14" height="18" rx="4" fill={fill} stroke={stroke} {...common} />
          <circle cx="23" cy="11" r="5" fill={fill} stroke={stroke} {...common} />
          <line x1="23" y1="3" x2="23" y2="9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "scalp-treatment":
      return (
        <svg width="64" height="84" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="12" fill={fill} stroke={stroke} {...common} />
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} {...common} />
          <circle cx="30" cy="43" r="9" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <path d="M30 38 L30 48 M25 43 L35 43" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "lotion":
      return (
        <svg width="58" height="86" viewBox="0 0 54 82" fill="none">
          <rect x="9" y="22" width="36" height="52" rx="9" fill={fill} stroke={stroke} {...common} />
          <rect x="15" y="9" width="24" height="18" rx="6" fill={fill} stroke={stroke} {...common} />
          <rect x="21" y="3" width="12" height="10" rx="3" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "face-cream":
      return (
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          <ellipse cx="40" cy="30" rx="32" ry="22" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="40" cy="22" rx="32" ry="6" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="40" cy="22" rx="14" ry="2" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "face-wash":
      return (
        <svg width="56" height="86" viewBox="0 0 52 82" fill="none">
          <path d="M9 36 Q9 24 26 24 Q43 24 43 36 L43 70 Q43 78 26 78 Q9 78 9 70 Z" fill={fill} stroke={stroke} {...common} />
          <rect x="17" y="9" width="18" height="18" rx="6" fill={fill} stroke={stroke} {...common} />
          <rect x="22" y="3" width="8" height="9" rx="2.5" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "accessory":
    default:
      return (
        <svg width="68" height="68" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="22" fill={fill} stroke={stroke} {...common} />
          <circle cx="28" cy="28" r="14" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <circle cx="28" cy="28" r="7" fill={stroke} opacity="0.4" />
        </svg>
      );
  }
}

/* ─── Subtle pattern in background ───────────────────────────────────────── */

function CategoryPattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.18]"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke={color} strokeWidth="1" strokeLinecap="round" fill="none">
        <path d="M10 30 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M10 60 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M10 90 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M10 120 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M10 150 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M10 180 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
      </g>
    </svg>
  );
}

/* ─── Card ────────────────────────────────────────────────────────────────── */

export default function ProductCard({
  product,
  reason,
  size = "default",
  onOrder,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = CATEGORY_THEME[product.category];
  const isCompact = size === "compact";
  const isPreOrder = product.status === "pre-order";
  const displayName = product.name.startsWith("Aunty ") ? product.name.slice(6) : product.name;

  /* ── 3D tilt on pointer move (desktop only) ── */
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isCompact) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6, y: x * 8 });
  }
  function handleLeave() {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }

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
    <div
      ref={cardRef}
      className="group flex flex-col"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 100ms ease" : "transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* ── Visual top section ── */}
      <div
        className={`relative rounded-3xl overflow-hidden mb-4 ${isCompact ? "aspect-[4/3]" : "aspect-[3/4]"}`}
        style={{
          background: theme.gradient,
          boxShadow: hovered
            ? `0 22px 50px -18px ${theme.accent}66`
            : `0 6px 20px -8px ${theme.accent}33`,
          transition: "box-shadow 350ms ease",
        }}
      >
        <CategoryPattern color={theme.pattern} />

        {/* Status pill */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[9px] font-bold tracking-[1.5px] uppercase backdrop-blur-md"
            style={{
              background: isPreOrder ? "rgba(26,15,8,0.85)" : "rgba(26,107,58,0.92)",
              color: isPreOrder ? "#E8C87A" : "#FDFCF8",
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: isPreOrder ? "#E8C87A" : "#FDFCF8" }}
            />
            {isPreOrder ? "Pre-order" : "Ships now"}
          </span>
        </div>

        {/* Centered illustration */}
        <div
          className="relative z-[2] h-full w-full flex items-center justify-center transition-transform duration-700"
          style={{
            transform: hovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
          }}
        >
          <ProductSilhouette type={product.productType} color="#1A0F08" />
        </div>

        {/* Plan A description hover panel */}
        {!isCompact && (
          <div
            className="absolute inset-0 flex flex-col justify-end px-5 pb-5 pt-4 z-[3] transition-all duration-500 ease-out"
            style={{
              background: "linear-gradient(to top, rgba(14,7,2,0.96) 55%, rgba(14,7,2,0.0) 100%)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <p className="font-body text-[8px] font-bold tracking-[2.5px] uppercase mb-2" style={{ color: theme.accent }}>
              Plan A
            </p>
            <p className="font-body text-[11.5px] leading-relaxed text-[#FDFCF8]/90 line-clamp-5">
              {product.whyItWorks}
            </p>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className={`flex flex-col ${isCompact ? "gap-1" : "gap-1.5"}`}>
        <h3
          className={`font-display font-bold text-[#1A0F08] leading-snug ${
            isCompact ? "text-sm" : "text-[15px]"
          }`}
        >
          {displayName}
        </h3>

        {reason && (
          <p className="font-body text-xs text-[#3D2B1A] leading-relaxed">{reason}</p>
        )}

        {!reason && !isCompact && product.painPoint && (
          <p className="font-body text-[13px] text-[#9E8C7A] leading-relaxed line-clamp-2">
            {product.painPoint}
          </p>
        )}

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(26,15,8,0.08)]">
          <span className={`font-display font-bold text-[#1A0F08] ${isCompact ? "text-sm" : "text-[16px]"}`}>
            ${product.price}
          </span>
          <button
            onClick={handleClick}
            disabled={loading}
            className={`group/btn inline-flex items-center gap-1.5 font-body font-bold tracking-[1.2px] uppercase transition-all disabled:opacity-60 ${
              isCompact ? "text-[10px]" : "text-[11px]"
            }`}
            style={{ color: theme.accent }}
          >
            {loading ? "..." : "Add"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-transform group-hover/btn:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
