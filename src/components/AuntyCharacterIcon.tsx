/**
 * AuntyCharacterIcon — ported directly from the React Native app's AuntyPortrait.tsx
 * (at /Users/thomastekeste/aunty-curl-council/src/components/AuntyPortrait.tsx).
 *
 * Each portrait is a distinct culturally-specific SVG illustration with unique
 * hair, skin tone, accessories, and expression. React Native SVG tags converted
 * to plain HTML SVG (Circle→circle, Path→path, Ellipse→ellipse, G→g, etc.).
 *
 * ViewBox: 0 0 100 100 — scale by setting width/height.
 */

interface AuntyCharacterIconProps {
  auntyId: string;
  size?: number;
  className?: string;
  glow?: boolean;
  color?: string; // used only for the optional glow ring
}

// ─── Individual portraits (1:1 ports from the app) ───────────────────────────

function Ngozi() {
  return (
    <g>
      {/* High puff afro */}
      <circle cx="50" cy="32" r="30" fill="#1A0F08" />
      <circle cx="50" cy="28" r="26" fill="#2D1B0E" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="22" ry="26" fill="#7A4428" />
      {/* Eyes */}
      <ellipse cx="42" cy="48" rx="3" ry="2.5" fill="#1A0F08" />
      <ellipse cx="58" cy="48" rx="3" ry="2.5" fill="#1A0F08" />
      <circle cx="43" cy="47.5" r="0.8" fill="white" />
      <circle cx="59" cy="47.5" r="0.8" fill="white" />
      {/* Warm smile */}
      <path d="M 42 58 Q 50 65 58 58" stroke="#5C2A12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Gold earrings */}
      <circle cx="28" cy="55" r="3" fill="#D4A04A" />
      <circle cx="72" cy="55" r="3" fill="#D4A04A" />
      {/* Nose */}
      <path d="M 48 52 Q 50 56 52 52" stroke="#5C2A12" strokeWidth="1" fill="none" />
    </g>
  );
}

function Marcia() {
  return (
    <g>
      {/* Headwrap */}
      <path d="M 25 40 Q 25 15 50 15 Q 75 15 75 40 L 72 42 Q 50 38 28 42 Z" fill="#1A7A4A" />
      <path d="M 28 38 Q 50 34 72 38 L 72 42 Q 50 38 28 42 Z" fill="#12603A" />
      {/* Locs peeking out */}
      <path d="M 26 42 Q 22 55 24 65" stroke="#1A0F08" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 74 42 Q 78 55 76 65" stroke="#1A0F08" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="22" ry="24" fill="#8B5A30" />
      {/* Eyes — knowing */}
      <ellipse cx="42" cy="48" rx="3" ry="2" fill="#1A0F08" />
      <ellipse cx="58" cy="48" rx="3" ry="2" fill="#1A0F08" />
      <circle cx="43" cy="47.5" r="0.8" fill="white" />
      <circle cx="59" cy="47.5" r="0.8" fill="white" />
      {/* Gentle smile */}
      <path d="M 44 58 Q 50 62 56 58" stroke="#5C2A12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M 48 52 Q 50 55 52 52" stroke="#6B3A18" strokeWidth="1" fill="none" />
    </g>
  );
}

function Denise() {
  return (
    <g>
      {/* Twist-out crown */}
      <circle cx="35" cy="25" r="8"  fill="#2D1B0E" />
      <circle cx="50" cy="20" r="9"  fill="#2D1B0E" />
      <circle cx="65" cy="25" r="8"  fill="#2D1B0E" />
      <circle cx="30" cy="35" r="7"  fill="#1A0F08" />
      <circle cx="70" cy="35" r="7"  fill="#1A0F08" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="22" ry="25" fill="#5C2A12" />
      {/* Eyes — wise, kind */}
      <ellipse cx="42" cy="48" rx="3.5" ry="2.5" fill="#1A0F08" />
      <ellipse cx="58" cy="48" rx="3.5" ry="2.5" fill="#1A0F08" />
      <circle cx="43" cy="47.5" r="1"   fill="white" />
      <circle cx="59" cy="47.5" r="1"   fill="white" />
      {/* Confident smile */}
      <path d="M 40 58 Q 50 66 60 58" stroke="#3D1A08" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blue earrings */}
      <circle cx="28" cy="52" r="2.5" fill="#3D5A99" />
      <circle cx="72" cy="52" r="2.5" fill="#3D5A99" />
      {/* Nose */}
      <path d="M 47 52 Q 50 56 53 52" stroke="#3D1A08" strokeWidth="1" fill="none" />
    </g>
  );
}

function Fatou() {
  return (
    <g>
      {/* Long braids */}
      <path d="M 35 18 L 32 70" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" />
      <path d="M 42 16 L 38 72" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" />
      <path d="M 58 16 L 62 72" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" />
      <path d="M 65 18 L 68 70" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" />
      {/* Beaded tips */}
      <circle cx="32" cy="72" r="2" fill="#7B3F6B" />
      <circle cx="38" cy="74" r="2" fill="#D4A04A" />
      <circle cx="62" cy="74" r="2" fill="#7B3F6B" />
      <circle cx="68" cy="72" r="2" fill="#D4A04A" />
      {/* Face */}
      <ellipse cx="50" cy="48" rx="20" ry="24" fill="#6B3A18" />
      {/* Elegant eyes */}
      <ellipse cx="43" cy="44" rx="3" ry="2" fill="#1A0F08" />
      <ellipse cx="57" cy="44" rx="3" ry="2" fill="#1A0F08" />
      {/* Arched brows */}
      <path d="M 38 40 Q 43 37 48 40" stroke="#3D1A08" strokeWidth="1.2" fill="none" />
      <path d="M 52 40 Q 57 37 62 40" stroke="#3D1A08" strokeWidth="1.2" fill="none" />
      {/* Refined smile */}
      <path d="M 44 54 Q 50 58 56 54" stroke="#4A2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Carmen() {
  return (
    <g>
      {/* Big fluffy curls */}
      <circle cx="30" cy="28" r="10" fill="#2D1B0E" />
      <circle cx="50" cy="18" r="12" fill="#2D1B0E" />
      <circle cx="70" cy="28" r="10" fill="#2D1B0E" />
      <circle cx="25" cy="42" r="9"  fill="#1A0F08" />
      <circle cx="75" cy="42" r="9"  fill="#1A0F08" />
      <circle cx="35" cy="22" r="8"  fill="#1A0F08" />
      <circle cx="65" cy="22" r="8"  fill="#1A0F08" />
      {/* Face */}
      <ellipse cx="50" cy="48" rx="21" ry="24" fill="#D4885A" />
      {/* Bright eyes */}
      <ellipse cx="42" cy="44" rx="3.5" ry="3" fill="#1A0F08" />
      <ellipse cx="58" cy="44" rx="3.5" ry="3" fill="#1A0F08" />
      <circle cx="43.5" cy="43.5" r="1.2" fill="white" />
      <circle cx="59.5" cy="43.5" r="1.2" fill="white" />
      {/* Wide joyful smile */}
      <path d="M 38 54 Q 50 66 62 54" stroke="#8B4A28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 42 56 Q 50 60 58 56" fill="white" />
      {/* Pink hoop earrings */}
      <circle cx="28" cy="50" r="4" fill="none" stroke="#C2456E" strokeWidth="2" />
      <circle cx="72" cy="50" r="4" fill="none" stroke="#C2456E" strokeWidth="2" />
    </g>
  );
}

function Amara() {
  return (
    <g>
      {/* Crown braids — halo */}
      <path d="M 25 38 Q 25 12 50 12 Q 75 12 75 38" stroke="#1A0F08" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* Gold crown accents */}
      <circle cx="38" cy="14" r="2" fill="#D4A04A" />
      <circle cx="50" cy="11" r="2" fill="#D4A04A" />
      <circle cx="62" cy="14" r="2" fill="#D4A04A" />
      {/* Face */}
      <ellipse cx="50" cy="48" rx="22" ry="26" fill="#3C1A0C" />
      {/* Strong eyes */}
      <ellipse cx="42" cy="44" rx="3" ry="2.5" fill="#0D0704" />
      <ellipse cx="58" cy="44" rx="3" ry="2.5" fill="#0D0704" />
      <circle cx="43" cy="43.5" r="0.8" fill="white" />
      <circle cx="59" cy="43.5" r="0.8" fill="white" />
      {/* Strong brows */}
      <path d="M 37 40 Q 42 37 47 40" stroke="#0D0704" strokeWidth="1.5" fill="none" />
      <path d="M 53 40 Q 58 37 63 40" stroke="#0D0704" strokeWidth="1.5" fill="none" />
      {/* Calm regal smile */}
      <path d="M 44 55 Q 50 59 56 55" stroke="#1A0F08" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Salma() {
  return (
    <g>
      {/* Elegant flowing hair */}
      <path d="M 30 25 Q 28 50 30 70" stroke="#2D1B0E" strokeWidth="6" fill="none" />
      <path d="M 35 22 Q 32 48 34 68" stroke="#1A0F08" strokeWidth="5" fill="none" />
      <path d="M 65 22 Q 68 48 66 68" stroke="#1A0F08" strokeWidth="5" fill="none" />
      <path d="M 70 25 Q 72 50 70 70" stroke="#2D1B0E" strokeWidth="6" fill="none" />
      {/* Top hair volume */}
      <ellipse cx="50" cy="22" rx="22" ry="12" fill="#1A0F08" />
      {/* Face */}
      <ellipse cx="50" cy="48" rx="20" ry="24" fill="#B87848" />
      {/* Almond eyes with kohl */}
      <path d="M 38 44 Q 43 41 48 44 Q 43 46 38 44" fill="#1A0F08" />
      <path d="M 52 44 Q 57 41 62 44 Q 57 46 52 44" fill="#1A0F08" />
      <circle cx="43" cy="43.5" r="0.6" fill="white" />
      <circle cx="57" cy="43.5" r="0.6" fill="white" />
      {/* Gentle smile */}
      <path d="M 44 55 Q 50 59 56 55" stroke="#7A4420" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Teal crescent earrings */}
      <path d="M 28 50 Q 24 48 28 44" stroke="#2A7B7B" strokeWidth="2" fill="none" />
      <path d="M 72 50 Q 76 48 72 44" stroke="#2A7B7B" strokeWidth="2" fill="none" />
    </g>
  );
}

// ─── Portrait map ─────────────────────────────────────────────────────────────

const PORTRAIT_MAP: Record<string, React.ComponentType> = {
  ngozi:  Ngozi,
  marcia: Marcia,
  denise: Denise,
  fatou:  Fatou,
  carmen: Carmen,
  amara:  Amara,
  salma:  Salma,
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function AuntyCharacterIcon({
  auntyId,
  size = 80,
  className = "",
  glow = false,
  color,
}: AuntyCharacterIconProps) {
  const Portrait = PORTRAIT_MAP[auntyId] ?? Ngozi;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && color && (
        <div
          className="absolute inset-[-10px] rounded-full animate-[glowPulse_3s_ease-in-out_infinite]"
          style={{ backgroundColor: color, opacity: 0.18, filter: "blur(14px)" }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", borderRadius: "50%" }}
      >
        {/* Cream background — matches app */}
        <circle cx="50" cy="50" r="50" fill="#F5EBD5" />
        <Portrait />
      </svg>
    </div>
  );
}
