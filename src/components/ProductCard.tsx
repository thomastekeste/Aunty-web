"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product, ProductCategory } from "@/data/products";
import { useCart } from "@/lib/cart";

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
    case "spf":
      return (
        <svg width="72" height="72" viewBox="0 0 68 68" fill="none">
          <rect x="8" y="20" width="52" height="32" rx="10" fill={fill} stroke={stroke} {...common} />
          <rect x="20" y="12" width="28" height="12" rx="5" fill={fill} stroke={stroke} {...common} />
          <line x1="16" y1="36" x2="52" y2="36" stroke={stroke} strokeOpacity="0.25" strokeWidth="1.2" />
          <circle cx="34" cy="44" r="4" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
        </svg>
      );
    case "scar-gel":
      return (
        <svg width="52" height="88" viewBox="0 0 48 84" fill="none">
          <path d="M10 28 Q10 20 24 20 Q38 20 38 28 L40 68 Q40 76 24 76 Q8 76 8 68 Z" fill={fill} stroke={stroke} {...common} />
          <rect x="17" y="10" width="14" height="13" rx="4" fill={fill} stroke={stroke} {...common} />
          <rect x="20" y="5" width="8" height="7" rx="2" fill={stroke} opacity="0.4" />
          <line x1="14" y1="50" x2="34" y2="50" stroke={stroke} strokeOpacity="0.25" strokeWidth="1.2" />
        </svg>
      );
    case "bonnet":
      return (
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="34" rx="24" ry="18" fill={fill} stroke={stroke} {...common} />
          <path d="M12 34 Q12 18 32 14 Q52 18 52 34" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="32" cy="34" rx="10" ry="3" fill={stroke} opacity="0.3" />
        </svg>
      );
    case "durag":
      return (
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
          <path d="M10 30 Q10 14 32 12 Q54 14 54 30 L54 36 Q54 42 32 44 Q10 42 10 36 Z" fill={fill} stroke={stroke} {...common} />
          <path d="M28 44 L24 58 M36 44 L40 58" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="32" cy="28" rx="14" ry="4" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.4" />
        </svg>
      );
    case "tool":
      return (
        <svg width="68" height="72" viewBox="0 0 60 66" fill="none">
          <rect x="24" y="6" width="12" height="40" rx="6" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="30" cy="52" rx="16" ry="8" fill={fill} stroke={stroke} {...common} />
          <line x1="30" y1="46" x2="30" y2="44" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case "roller":
      return (
        <svg width="68" height="78" viewBox="0 0 60 70" fill="none">
          <rect x="26" y="30" width="8" height="28" rx="4" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="30" cy="18" rx="18" ry="14" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="30" cy="18" rx="8" ry="5" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.4" />
        </svg>
      );
    case "mask":
      return (
        <svg width="76" height="72" viewBox="0 0 68 64" fill="none">
          <ellipse cx="34" cy="32" rx="28" ry="26" fill={fill} stroke={stroke} {...common} />
          <ellipse cx="22" cy="26" rx="6" ry="4" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <ellipse cx="46" cy="26" rx="6" ry="4" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <path d="M26 40 Q34 46 42 40" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.4" />
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
  const [added, setAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1500);
    return () => window.clearTimeout(t);
  }, [added]);

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

  const handleClick = () => {
    if (onOrder) {
      onOrder();
      return;
    }
    addItem(product.id);
    setAdded(true);
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
        className={`relative rounded-2xl overflow-hidden mb-3 ${isCompact ? "aspect-[4/3]" : "aspect-[4/5]"}`}
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

        {/* Product visual */}
        <div
          className="relative z-[2] h-full w-full flex items-center justify-center transition-transform duration-700"
          style={{
            transform: hovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
          }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <ProductSilhouette type={product.productType} color="#1A0F08" />
          )}
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
      <div className={`flex flex-col text-center ${isCompact ? "gap-1" : "gap-2 pt-1"}`}>
        <h3
          className={`font-display font-semibold text-[#1A0F08] leading-snug ${
            isCompact ? "text-sm" : "text-[17px] md:text-[18px]"
          }`}
        >
          {displayName}
        </h3>

        {reason && (
          <p className="font-body text-[13px] text-[#3D2B1A] leading-relaxed">{reason}</p>
        )}

        {!reason && !isCompact && product.painPoint && (
          <p className="font-body text-[13px] text-[#6B5040]/70 leading-relaxed line-clamp-2">
            {product.painPoint}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 mt-1">
          <span className={`font-body text-[#6B5040] ${isCompact ? "text-sm" : "text-[15px]"}`}>
            From ${product.price}
          </span>
        </div>

        <button
          onClick={handleClick}
          className={`group/btn mt-1 inline-flex items-center justify-center gap-1.5 font-body font-semibold tracking-[1px] uppercase transition-all hover:text-[#1A0F08] ${
            isCompact ? "text-[10px]" : "text-[11px]"
          }`}
          style={{ color: theme.accent }}
        >
          {added ? "Added" : "Add to bag"}
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
            {added ? (
              <path d="M5 12l5 5L20 7" />
            ) : (
              <path d="M5 12h14M13 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
