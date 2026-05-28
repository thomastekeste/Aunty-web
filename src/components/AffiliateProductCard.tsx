"use client";

import { useRef, useState } from "react";
import type { AffiliateProduct, AffiliateCategory } from "@/data/affiliate-products";

interface AffiliateProductCardProps {
  product: AffiliateProduct;
}

/* ─── Category-specific theming ──────────────────────────────────────────── */

const CATEGORY_THEME: Record<
  AffiliateCategory,
  { gradient: string; accent: string; pattern: string }
> = {
  cleanser:           { gradient: "linear-gradient(155deg, #FFF5EB 0%, #F0D6B8 65%, #D4B896 100%)", accent: "#A0701E", pattern: "#7A5A2A" },
  conditioner:        { gradient: "linear-gradient(155deg, #F0EBF5 0%, #D4C4E0 65%, #B8A5CC 100%)", accent: "#6B4F8A", pattern: "#4D3866" },
  "deep-conditioner": { gradient: "linear-gradient(155deg, #F0EBF5 0%, #D4C4E0 65%, #B8A5CC 100%)", accent: "#6B4F8A", pattern: "#4D3866" },
  "leave-in":         { gradient: "linear-gradient(155deg, #E8F0ED 0%, #BFD9C8 65%, #9CB9A7 100%)", accent: "#3F6B52", pattern: "#2D4F3D" },
  styler:             { gradient: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 70%, #D4A04A 100%)", accent: "#A0701E", pattern: "#7A5A2A" },
  oil:                { gradient: "linear-gradient(155deg, #FFF5EB 0%, #F0D6B8 65%, #D4B896 100%)", accent: "#8B6914", pattern: "#6B5020" },
  gel:                { gradient: "linear-gradient(155deg, #EBF0F5 0%, #B8C8D4 65%, #96AABC 100%)", accent: "#3D6B8B", pattern: "#2D4F66" },
  cream:              { gradient: "linear-gradient(155deg, #F7F0E8 0%, #E8D4C0 65%, #D4B896 100%)", accent: "#8B6540", pattern: "#6B4F30" },
  "protein-treatment":{ gradient: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 70%, #D4A04A 100%)", accent: "#A0701E", pattern: "#7A5A2A" },
  "scalp-treatment":  { gradient: "linear-gradient(155deg, #E4EDE8 0%, #BFD9C8 65%, #9CB9A7 100%)", accent: "#3F6B52", pattern: "#2D4F3D" },
  "edge-control":     { gradient: "linear-gradient(155deg, #F0E8EB 0%, #D4B8C0 65%, #BCA0A8 100%)", accent: "#8B4A5A", pattern: "#664050" },
};

/* ─── Product silhouettes ────────────────────────────────────────────────── */

function AffSilhouette({ category, color }: { category: AffiliateCategory; color: string }) {
  const stroke = color;
  const fill = `${color}1F`;
  const common = { strokeWidth: 1.6 } as const;

  switch (category) {
    case "cleanser":
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
    case "leave-in":
      return (
        <svg width="72" height="86" viewBox="0 0 68 80" fill="none">
          <rect x="12" y="24" width="44" height="48" rx="12" fill={fill} stroke={stroke} {...common} />
          <rect x="22" y="10" width="24" height="18" rx="7" fill={fill} stroke={stroke} {...common} />
          <circle cx="34" cy="19" r="4" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "oil":
      return (
        <svg width="48" height="88" viewBox="0 0 46 86" fill="none">
          <rect x="13" y="32" width="20" height="46" rx="7" fill={fill} stroke={stroke} {...common} />
          <rect x="16" y="18" width="14" height="18" rx="4" fill={fill} stroke={stroke} {...common} />
          <circle cx="23" cy="11" r="5" fill={fill} stroke={stroke} {...common} />
          <line x1="23" y1="3" x2="23" y2="9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "gel":
    case "cream":
    case "styler":
      return (
        <svg width="58" height="86" viewBox="0 0 54 82" fill="none">
          <rect x="9" y="22" width="36" height="52" rx="9" fill={fill} stroke={stroke} {...common} />
          <rect x="15" y="9" width="24" height="18" rx="6" fill={fill} stroke={stroke} {...common} />
          <rect x="21" y="3" width="12" height="10" rx="3" fill={stroke} opacity="0.4" />
        </svg>
      );
    case "protein-treatment":
      return (
        <svg width="64" height="84" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="12" fill={fill} stroke={stroke} {...common} />
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} {...common} />
          <circle cx="30" cy="43" r="9" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <path d="M30 38 L30 48 M25 43 L35 43" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
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
    case "edge-control":
      return (
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          <ellipse cx="40" cy="30" rx="32" ry="22" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="40" cy="22" rx="32" ry="6" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="40" cy="22" rx="14" ry="2" fill={stroke} opacity="0.4" />
        </svg>
      );
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

/* ─── Star rating ────────────────────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#C9903A" : "none"}
          stroke="#C9903A"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 font-body text-[11px] text-[#6B5040]">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─── Pattern ────────────────────────────────────────────────────────────── */

function AffPattern({ color }: { color: string }) {
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

export default function AffiliateProductCard({ product }: AffiliateProductCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = CATEGORY_THEME[product.category];

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
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
        className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/5]"
        style={{
          background: theme.gradient,
          boxShadow: hovered
            ? `0 22px 50px -18px ${theme.accent}66`
            : `0 6px 20px -8px ${theme.accent}33`,
          transition: "box-shadow 350ms ease",
        }}
      >
        <AffPattern color={theme.pattern} />

        {/* Brand pill */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[9px] font-bold tracking-[1.5px] uppercase backdrop-blur-md"
            style={{
              background: `${theme.accent}E8`,
              color: "#FDFCF8",
            }}
          >
            {product.brand}
          </span>
        </div>

        {/* Badge — premium or budget */}
        {(product.isPremiumPick || product.isBudgetFriendly) && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full font-body text-[8px] font-bold tracking-[1px] uppercase backdrop-blur-md"
              style={{
                background: product.isPremiumPick ? "rgba(201,144,58,0.9)" : "rgba(63,107,82,0.9)",
                color: "#FDFCF8",
              }}
            >
              {product.isPremiumPick ? "Premium" : "Budget pick"}
            </span>
          </div>
        )}

        {/* Product visual */}
        <div
          className="relative z-[2] h-full w-full flex items-center justify-center transition-transform duration-700"
          style={{
            transform: hovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
          }}
        >
          <AffSilhouette category={product.category} color="#1A0F08" />
        </div>

        {/* Why it works hover panel */}
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
            Why it works
          </p>
          <p className="font-body text-[11.5px] leading-relaxed text-[#FDFCF8]/90 line-clamp-5">
            {product.whyItWorks}
          </p>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col text-center gap-2 pt-1">
        <h3 className="font-display font-semibold text-[17px] md:text-[18px] text-[#1A0F08] leading-snug">
          {product.name}
        </h3>

        <Stars rating={product.rating} />

        <p className="font-body text-[13px] text-[#6B5040]/70 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-center gap-3 mt-1">
          <span className="font-body text-[15px] text-[#6B5040]">
            {product.price} &middot; {product.size}
          </span>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn mt-1 inline-flex items-center justify-center gap-1.5 font-body font-semibold text-[11px] tracking-[1px] uppercase transition-all hover:text-[#1A0F08]"
          style={{ color: theme.accent }}
        >
          Shop at {product.brand}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-transform group-hover/btn:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
