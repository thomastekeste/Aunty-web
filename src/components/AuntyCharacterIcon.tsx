/**
 * AuntyCharacterIcon — unique SVG character illustration per aunty.
 * Each one has a distinct natural hairstyle silhouette in their brand colour.
 * Renders cleanly from 40px to 120px. Pass `size` for the square dimension.
 */

const SKIN = "#D4906A";   // warm inclusive skin tone
const INK  = "#2D1B0E";  // dark features

// ─── Individual hair/silhouette shapes ───────────────────────────────────────

function NgoziHair({ c }: { c: string }) {
  // Big bold natural afro — the widest silhouette
  return (
    <>
      <ellipse cx="40" cy="24" rx="23" ry="20" fill={c} />
      <ellipse cx="17" cy="42" rx="9"  ry="15" fill={c} />
      <ellipse cx="63" cy="42" rx="9"  ry="15" fill={c} />
      {/* subtle texture arc */}
      <path d="M 22 20 Q 40 13 58 20" stroke={c} strokeWidth="2" strokeOpacity="0.4" fill="none" strokeLinecap="round"/>
    </>
  );
}

function MarciaHair({ c }: { c: string }) {
  // Loose defined curls, Caribbean bounce — falls past shoulders
  return (
    <>
      <path d="M 8 48 Q 6 18, 40 12 Q 74 18, 72 48" fill={c} />
      {/* hanging curl clusters */}
      <circle cx="14" cy="56" r="5.5" fill={c} />
      <circle cx="22" cy="63" r="4.5" fill={c} />
      <circle cx="58" cy="56" r="5.5" fill={c} />
      <circle cx="66" cy="63" r="4.5" fill={c} />
      {/* hair parting */}
      <path d="M 32 14 Q 40 10 48 14" stroke={c} strokeWidth="1.5" strokeOpacity="0.5" fill="none" strokeLinecap="round"/>
    </>
  );
}

function DeniseHair({ c }: { c: string }) {
  // High pineapple / protective top bun — wise, put-together
  return (
    <>
      {/* bun body — tall */}
      <ellipse cx="40" cy="13" rx="13" ry="15" fill={c} />
      {/* bun base band */}
      <rect x="25" y="24" width="30" height="6" rx="3" fill={c} />
      {/* edges of hair below bun */}
      <path d="M 22 30 Q 18 36, 20 44" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 58 30 Q 62 36, 60 44" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none" />
    </>
  );
}

function FatouHair({ c }: { c: string }) {
  // Sleek high top-knot with decorative pins — precise, elegant
  return (
    <>
      {/* pulled-back hair base */}
      <path d="M 18 38 Q 16 22, 40 18 Q 64 22, 62 38" fill={c} />
      {/* tight top-knot */}
      <ellipse cx="40" cy="11" rx="9" ry="9" fill={c} />
      {/* three gold pins */}
      <line x1="34" y1="16" x2="32" y2="26" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="14" x2="40" y2="25" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="46" y1="16" x2="48" y2="26" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
    </>
  );
}

function CarmenHair({ c }: { c: string }) {
  // Huge voluminous ringlets — the biggest, most dramatic silhouette
  return (
    <>
      <circle cx="40" cy="20" r="25" fill={c} />
      <circle cx="13" cy="38" r="11" fill={c} />
      <circle cx="67" cy="38" r="11" fill={c} />
      <circle cx="10" cy="26" r="7"  fill={c} />
      <circle cx="70" cy="26" r="7"  fill={c} />
      {/* playful bounce detail */}
      <path d="M 16 14 Q 40 6 64 14" stroke={c} strokeWidth="2" strokeOpacity="0.4" fill="none" strokeLinecap="round"/>
    </>
  );
}

function AmaraHair({ c }: { c: string }) {
  // Long locs flowing down — strong, grounded, flowing
  return (
    <>
      {/* top hair base */}
      <path d="M 14 40 Q 12 18, 40 14 Q 68 18, 66 40" fill={c} />
      {/* locs on sides */}
      <path d="M 18 34 Q 10 52, 12 72" stroke={c} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <path d="M 26 28 Q 16 48, 20 70" stroke={c} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M 62 34 Q 70 52, 68 72" stroke={c} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <path d="M 54 28 Q 64 48, 60 70" stroke={c} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
    </>
  );
}

function SalmaHair({ c }: { c: string }) {
  // Soft head wrap — calm, serene, covering crown
  return (
    <>
      {/* wrap base */}
      <path d="M 8 40 Q 8 12, 40 8 Q 72 12, 72 40 Q 62 28, 40 26 Q 18 28, 8 40 Z" fill={c} />
      {/* fabric fold shadow */}
      <path
        d="M 16 26 Q 28 20, 40 20 Q 52 20, 64 26 Q 52 23, 40 23 Q 28 23, 16 26 Z"
        fill="rgba(0,0,0,0.12)"
      />
      {/* wrap knot / rosette at front-top */}
      <circle cx="40" cy="10" r="7" fill={c} />
      <circle cx="34" cy="12" r="4" fill={c} />
      <circle cx="46" cy="12" r="4" fill={c} />
    </>
  );
}

// ─── Hair map ────────────────────────────────────────────────────────────────

const HAIR_MAP: Record<string, React.ComponentType<{ c: string }>> = {
  ngozi:  NgoziHair,
  marcia: MarciaHair,
  denise: DeniseHair,
  fatou:  FatouHair,
  carmen: CarmenHair,
  amara:  AmaraHair,
  salma:  SalmaHair,
};

// ─── Main component ───────────────────────────────────────────────────────────

interface AuntyCharacterIconProps {
  auntyId: string;
  color: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function AuntyCharacterIcon({
  auntyId,
  color,
  size = 80,
  className = "",
  glow = false,
}: AuntyCharacterIconProps) {
  const HairComponent = HAIR_MAP[auntyId] ?? NgoziHair;
  const clipId = `clip-${auntyId}-${size}`;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-[-10px] rounded-full animate-[glowPulse_3s_ease-in-out_infinite]"
          style={{ backgroundColor: color, opacity: 0.18, filter: "blur(14px)" }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="40" cy="40" r="40" />
          </clipPath>
        </defs>

        {/* Background tint */}
        <circle cx="40" cy="40" r="40" fill={color} fillOpacity="0.14" />
        <circle cx="40" cy="40" r="40" stroke={color} strokeOpacity="0.25" strokeWidth="1.5" fill="none"/>

        {/* All character art clipped to circle */}
        <g clipPath={`url(#${clipId})`}>
          {/* Hair drawn BEHIND face */}
          <HairComponent c={color} />

          {/* Neck */}
          <rect x="33" y="60" width="14" height="12" rx="4" fill={SKIN} />

          {/* Shoulders */}
          <path
            d="M 0 80 Q 0 70, 20 66 Q 30 63, 40 63 Q 50 63, 60 66 Q 80 70, 80 80 Z"
            fill={color}
            fillOpacity="0.7"
          />

          {/* Face oval */}
          <ellipse cx="40" cy="45" rx="14" ry="17" fill={SKIN} />

          {/* Eyes */}
          <circle cx="35" cy="42" r="2.2" fill={INK} />
          <circle cx="45" cy="42" r="2.2" fill={INK} />
          {/* Eye glints */}
          <circle cx="36.2" cy="41" r="0.7" fill="white" />
          <circle cx="46.2" cy="41" r="0.7" fill="white" />

          {/* Nose */}
          <circle cx="40" cy="48" r="1.1" fill={INK} fillOpacity="0.35" />

          {/* Smile */}
          <path
            d="M 35 52 Q 40 57 45 52"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
