"use client";

type CurlType = "2a"|"2b"|"2c"|"3a"|"3b"|"3c"|"4a"|"4b"|"4c";

export type { CurlType };

export default function CurlGlyph({ type, color, size = 44 }: { type: CurlType; color: string; size?: number }) {
  const stroke = color;
  const w = 2.2;
  const isWavy = type.startsWith("2");
  const isCurly = type.startsWith("3");
  const isCoily = type.startsWith("4");
  const tightness = type.endsWith("a") ? 0 : type.endsWith("b") ? 1 : 2;

  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {isWavy && (
        <path
          d={`M6 22 Q ${11 + tightness} ${14 - tightness * 2} 16 22 T 26 22 T 36 22`}
          stroke={stroke} strokeWidth={w} fill="none" strokeLinecap="round"
        />
      )}
      {isCurly && (
        <>
          <circle cx="14" cy="22" r={6 - tightness} stroke={stroke} strokeWidth={w} fill="none" />
          <circle cx="24" cy="22" r={6 - tightness} stroke={stroke} strokeWidth={w} fill="none" />
          <circle cx="34" cy="22" r={6 - tightness} stroke={stroke} strokeWidth={w} fill="none" />
        </>
      )}
      {isCoily && type !== "4c" && (
        <path
          d={`M8 12 Q12 16 8 20 Q4 24 8 28 Q12 32 8 36
              M22 12 Q26 16 22 20 Q18 24 22 28 Q26 32 22 36
              M36 12 Q40 16 36 20 Q32 24 36 28 Q40 32 36 36`}
          stroke={stroke} strokeWidth={w - 0.4} fill="none" strokeLinecap="round"
        />
      )}
      {type === "4c" && (
        <>
          <circle cx="11" cy="14" r="2" fill={stroke} />
          <circle cx="20" cy="11" r="2" fill={stroke} />
          <circle cx="30" cy="14" r="2" fill={stroke} />
          <circle cx="14" cy="22" r="2" fill={stroke} />
          <circle cx="24" cy="22" r="2" fill={stroke} />
          <circle cx="33" cy="24" r="2" fill={stroke} />
          <circle cx="11" cy="32" r="2" fill={stroke} />
          <circle cx="22" cy="32" r="2" fill={stroke} />
          <circle cx="32" cy="33" r="2" fill={stroke} />
        </>
      )}
    </svg>
  );
}
