"use client";

export default function ProductIllustration({ type, color }: { type: string; color: string }) {
  const stroke = color;
  const fill = color + "1A";

  switch (type) {
    case "shampoo":
      return (
        <svg width="64" height="86" viewBox="0 0 64 86" fill="none">
          <rect x="14" y="22" width="36" height="56" rx="10" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="22" y="12" width="20" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="25" y="6" width="14" height="9" rx="3" fill={stroke} opacity="0.5"/>
        </svg>
      );
    case "conditioner": case "deep-conditioner":
      return (
        <svg width="68" height="80" viewBox="0 0 68 80" fill="none">
          <rect x="12" y="24" width="44" height="48" rx="12" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="22" y="10" width="24" height="18" rx="7" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <circle cx="34" cy="19" r="4" fill={stroke} opacity="0.4"/>
        </svg>
      );
    case "curl-cream":
      return (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <ellipse cx="35" cy="58" rx="26" ry="6" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="9" y="22" width="52" height="38" rx="9" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <ellipse cx="35" cy="22" rx="26" ry="6" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <circle cx="35" cy="22" r="5" fill={stroke} opacity="0.4"/>
        </svg>
      );
    case "scalp-serum": case "growth-oil": case "face-serum": case "serum":
      return (
        <svg width="46" height="86" viewBox="0 0 46 86" fill="none">
          <rect x="13" y="32" width="20" height="46" rx="7" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="16" y="18" width="14" height="18" rx="4" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <circle cx="23" cy="11" r="5" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <line x1="23" y1="3" x2="23" y2="9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      );
    case "scalp-treatment":
      return (
        <svg width="60" height="78" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="12" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <circle cx="30" cy="43" r="8" fill="none" stroke={stroke} strokeWidth="1.4" opacity="0.4"/>
          <path d="M30 38 L30 48 M25 43 L35 43" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );
    case "lotion":
      return (
        <svg width="54" height="82" viewBox="0 0 54 82" fill="none">
          <rect x="9" y="22" width="36" height="52" rx="9" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="15" y="9" width="24" height="18" rx="6" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="21" y="3" width="12" height="10" rx="3" fill={stroke} opacity="0.4"/>
        </svg>
      );
    case "spf":
      return (
        <svg width="42" height="86" viewBox="0 0 42 86" fill="none">
          <rect x="7" y="12" width="28" height="66" rx="9" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="11" y="4" width="20" height="12" rx="5" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <text x="11" y="50" fontFamily="sans-serif" fontSize="11" fill={stroke} fontWeight="700" opacity="0.85">SPF</text>
        </svg>
      );
    case "face-wash":
      return (
        <svg width="52" height="82" viewBox="0 0 52 82" fill="none">
          <path d="M9 36 Q9 24 26 24 Q43 24 43 36 L43 70 Q43 78 26 78 Q9 78 9 70 Z"
                fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="17" y="9" width="18" height="18" rx="6" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="22" y="3" width="8" height="9" rx="2.5" fill={stroke} opacity="0.4"/>
        </svg>
      );
    case "scar-gel":
      return (
        <svg width="60" height="78" viewBox="0 0 60 78" fill="none">
          <rect x="7" y="16" width="46" height="54" rx="9" fill={fill} stroke={stroke} strokeWidth="1.8"/>
          <rect x="16" y="6" width="28" height="14" rx="5" fill={fill} stroke={stroke} strokeWidth="1.8"/>
        </svg>
      );
    default:
      return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="6" y="6" width="44" height="44" rx="11" fill={fill} stroke={stroke} strokeWidth="1.8"/>
        </svg>
      );
  }
}
