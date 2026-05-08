"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/data/products";
import AppPreview from "@/components/AppPreview";
import {
  porosityOptions,
  moistureLevelOptions, hairLossOptions, scalpHealthOptions,
  stylingFrustrationOptions, hairGoalOptions,
  getHairTieredMatches, getConveningMessages, getVerdicts,
  washFeelOptions, ashyLevelOptions, productReactionOptions, middayFinishOptions,
  auntySkinTypes, determineSkinType,
  getSkinProductMatches, getSkinConveningMessages, getSkinVerdicts,
  type HairCategory, type Porosity,
  type MoistureLevel, type HairLoss, type ScalpHealth, type StylingFrustration, type HairGoal,
  type WashFeel, type AshyLevel, type ProductReaction, type MiddayFinish,
  type AuntySkinType, type TieredMatches,
} from "@/data/quiz";

const BROWN = "#2D1B0E";
const MUTED = "#6B5040";
const CANVAS = "#FDFCF8";

type Journey = "hair" | "skin" | null;

type CurlType = "2a"|"2b"|"2c"|"3a"|"3b"|"3c"|"4a"|"4b"|"4c";

const curlTypes: { id: CurlType; label: string; desc: string; cat: HairCategory }[] = [
  { id: "2a", label: "2A", desc: "Loose S-waves",      cat: "wavy" },
  { id: "2b", label: "2B", desc: "Defined S-waves",    cat: "wavy" },
  { id: "2c", label: "2C", desc: "Wavy + some curl",   cat: "wavy" },
  { id: "3a", label: "3A", desc: "Loose spirals",      cat: "curly" },
  { id: "3b", label: "3B", desc: "Springy ringlets",   cat: "curly" },
  { id: "3c", label: "3C", desc: "Tight corkscrews",   cat: "curly" },
  { id: "4a", label: "4A", desc: "Tight S-coils",      cat: "coily" },
  { id: "4b", label: "4B", desc: "Z-pattern coils",    cat: "coily" },
  { id: "4c", label: "4C", desc: "Densest, no pattern",cat: "coily-dense" },
];

type QuizPhase =
  | "journey-pick"
  | "hair-type" | "porosity" | "hair-moisture" | "hair-loss" | "hair-scalp" | "hair-styling" | "hair-goal"
  | "hair-convening" | "hair-results"
  | "skin-wash-feel" | "skin-ashy" | "skin-reaction" | "skin-finish"
  | "skin-convening" | "skin-results";

// ── Curl-pattern mini SVG ──────────────────────────────────────────────────
function CurlGlyph({ type, color, size = 44 }: { type: CurlType; color: string; size?: number }) {
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

// ── Step indicator ────────────────────────────────────────────────────────
function StepDots({ total, current, accent }: { total: number; current: number; accent: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 22 : 6,
            height: 6,
            backgroundColor: i <= current ? accent : "rgba(26,15,8,0.1)",
          }}
        />
      ))}
    </div>
  );
}

// ── Convening animation ───────────────────────────────────────────────────
function Convening({ messages, accent, onDone }: { messages: string[]; accent: string; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setIdx(i), i * 800));
    });
    timers.push(setTimeout(onDone, messages.length * 800 + 400));
    return () => timers.forEach(clearTimeout);
  }, [messages, onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="flex justify-center gap-1.5 mb-10">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: accent,
              opacity: 0.2 + 0.13 * i,
              animation: `convene 1.8s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <p className="font-display text-xl md:text-2xl text-[#2D1B0E]/80 max-w-md min-h-[64px]">
        {messages[idx]}
      </p>
    </div>
  );
}

// ── Product illustrations (clean abstract bottle silhouettes) ─────────────
function ProductIllustration({ type, color }: { type: string; color: string }) {
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

// ── Product card — ingredient-first ─────────────────────────────────────
function TierProductCard({ productId, reason, accent }: { productId: string; reason: string; accent: string }) {
  const product = getProductById(productId);
  if (!product) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(26,15,8,0.06)]">
      <div className="relative flex items-center justify-center py-8 bg-[#F7F5F0]">
        <ProductIllustration type={product.productType} color={accent} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-display text-base font-bold text-[#2D1B0E] leading-snug">{product.name}</h4>
          <span className="font-display text-lg font-bold text-[#2D1B0E] ml-3 flex-shrink-0">${product.price}</span>
        </div>
        {product.keyIngredients.length > 0 && (
          <div className="mb-3">
            <p className="font-body text-[9px] tracking-[2px] uppercase mb-1.5 font-semibold text-[#9E8C7A]">
              Key Actives
            </p>
            <div className="flex flex-wrap gap-1">
              {product.keyIngredients.map((ing) => (
                <span key={ing} className="font-body text-[10px] px-2.5 py-1 rounded-full font-medium bg-[#F7F5F0] text-[#6B5040]">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="p-3 rounded-lg bg-[#F7F5F0] border border-[rgba(26,15,8,0.04)]">
          <p className="font-body text-[10px] tracking-[2px] uppercase font-semibold mb-1" style={{ color: accent }}>
            Why your aunty picked this
          </p>
          <p className="font-body text-xs text-[#6B5040] leading-relaxed">{reason}</p>
        </div>
      </div>
    </div>
  );
}

// ── Option button (single-select) ─────────────────────────────────────────
function OptionButton({
  selected, onClick, label, sub, accent,
}: {
  selected: boolean; onClick: () => void; label: string; sub?: string; accent: string;
}) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl border transition-all duration-150"
      style={{
        borderColor: selected ? accent : "rgba(26,15,8,0.12)",
        backgroundColor: selected ? accent + "0D" : "transparent",
        boxShadow: selected ? `0 0 0 1.5px ${accent}` : "none",
      }}>
      <div className="flex items-start gap-3">
        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
             style={{ borderColor: selected ? accent : "rgba(26,15,8,0.25)", backgroundColor: selected ? accent : "transparent" }}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#FDFCF8]" />}
        </div>
        <div className="flex-1">
          <p className="font-body text-base font-semibold text-[#2D1B0E] leading-snug">{label}</p>
          {sub && <p className="font-body text-sm text-[#6B5040] mt-0.5 leading-relaxed">{sub}</p>}
        </div>
      </div>
    </button>
  );
}

// ── Quiz container w/ shared chrome ───────────────────────────────────────
function QuizFrame({
  step, total, accent, eyebrow, title, hint, children, onBack, onClose,
}: {
  step: number; total: number; accent: string;
  eyebrow: string; title: string; hint?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
        <button onClick={onBack} disabled={!onBack}
          className="font-body text-xs text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors disabled:opacity-0">
          ← Back
        </button>
        <StepDots total={total} current={step} accent={accent} />
        <button onClick={onClose} aria-label="Close consultation"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pb-10 md:pb-16 pt-4 md:pt-12">
        <div className="w-full max-w-2xl mx-auto">
          <p className="font-body text-[11px] tracking-[3px] uppercase mb-3 text-center" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-bold text-[#2D1B0E] text-center mb-3 leading-[1.1]">
            {title}
          </h2>
          {hint && (
            <p className="font-body text-base text-[#6B5040] text-center mb-8 max-w-lg mx-auto">
              {hint}
            </p>
          )}
          {!hint && <div className="h-8" />}
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ConsultationQuiz() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<QuizPhase>("journey-pick");
  const [journey, setJourney] = useState<Journey>(null);

  // Hair state
  const [curl, setCurl] = useState<CurlType | null>(null);
  const [porosity, setPorosity] = useState<Porosity | null>(null);
  const [showPorosityHelp, setShowPorosityHelp] = useState(false);
  const [moisture, setMoisture] = useState<MoistureLevel | null>(null);
  const [hairLoss, setHairLoss] = useState<HairLoss | null>(null);
  const [scalpHealth, setScalpHealth] = useState<ScalpHealth | null>(null);
  const [stylingFrustration, setStylingFrustration] = useState<StylingFrustration | null>(null);
  const [hairGoal, setHairGoal] = useState<HairGoal | null>(null);

  // Skin state
  const [washFeel, setWashFeel] = useState<WashFeel | null>(null);
  const [ashyLevel, setAshyLevel] = useState<AshyLevel | null>(null);
  const [productReaction, setProductReaction] = useState<ProductReaction | null>(null);
  const [middayFinish, setMiddayFinish] = useState<MiddayFinish | null>(null);
  const [detectedSkinType, setDetectedSkinType] = useState<AuntySkinType | null>(null);

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#quiz");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const accent = journey === "skin" ? MUTED : BROWN;

  const reset = () => {
    setPhase("journey-pick"); setJourney(null);
    setCurl(null); setPorosity(null); setShowPorosityHelp(false);
    setMoisture(null); setHairLoss(null); setScalpHealth(null);
    setStylingFrustration(null); setHairGoal(null);
    setWashFeel(null); setAshyLevel(null);
    setProductReaction(null); setMiddayFinish(null); setDetectedSkinType(null);
  };

  const close = () => {
    if (window.location.hash === "#quiz") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setOpen(false);
    setTimeout(reset, 300);
  };

  const startJourney = (j: "hair" | "skin") => {
    setJourney(j);
    setPhase(j === "hair" ? "hair-type" : "skin-wash-feel");
  };

  const HAIR_STEPS = 7;
  const SKIN_STEPS = 4;
  const hairStep: Partial<Record<QuizPhase, number>> = {
    "hair-type": 0, "porosity": 1, "hair-moisture": 2, "hair-loss": 3,
    "hair-scalp": 4, "hair-styling": 5, "hair-goal": 6,
    "hair-convening": 6, "hair-results": 6,
  };
  const skinStep: Partial<Record<QuizPhase, number>> = {
    "skin-wash-feel": 0, "skin-ashy": 1, "skin-reaction": 2, "skin-finish": 3,
    "skin-convening": 3, "skin-results": 3,
  };

  const back = (() => {
    const map: Partial<Record<QuizPhase, () => void>> = {
      "hair-type":     () => { setPhase("journey-pick"); setJourney(null); },
      "porosity":      () => setPhase("hair-type"),
      "hair-moisture": () => setPhase("porosity"),
      "hair-loss":     () => setPhase("hair-moisture"),
      "hair-scalp":    () => setPhase("hair-loss"),
      "hair-styling":  () => setPhase("hair-scalp"),
      "hair-goal":     () => setPhase("hair-styling"),
      "skin-wash-feel": () => { setPhase("journey-pick"); setJourney(null); },
      "skin-ashy":     () => setPhase("skin-wash-feel"),
      "skin-reaction": () => setPhase("skin-ashy"),
      "skin-finish":   () => setPhase("skin-reaction"),
    };
    return map[phase];
  })();

  const hairCat: HairCategory | null = curl ? curlTypes.find((c) => c.id === curl)!.cat : null;

  const hairTiered: TieredMatches | null =
    hairCat && porosity && moisture && hairLoss && scalpHealth && stylingFrustration && hairGoal
      ? getHairTieredMatches(hairCat, porosity, moisture, hairLoss, scalpHealth, stylingFrustration, hairGoal)
      : null;
  const hairVerdicts = hairCat && porosity && moisture && hairGoal
    ? getVerdicts(hairCat, porosity, moisture, hairGoal) : [];
  const hairMessages = hairCat && porosity && moisture && hairGoal
    ? getConveningMessages(hairCat, porosity, moisture, hairGoal) : [];

  const skinTiered: TieredMatches | null = detectedSkinType ? getSkinProductMatches(detectedSkinType) : null;
  const skinVerdicts = detectedSkinType ? getSkinVerdicts(detectedSkinType) : [];
  const skinMessages = detectedSkinType ? getSkinConveningMessages(detectedSkinType) : [];

  const ContinueBtn = ({ disabled, onClick, label = "Continue" }: { disabled: boolean; onClick: () => void; label?: string }) => (
    <button disabled={disabled} onClick={onClick}
      className="w-full mt-8 py-4 rounded-full font-body text-[13px] font-semibold tracking-[1px] uppercase transition-all"
      style={{
        backgroundColor: !disabled ? "#2D1B0E" : "rgba(26,15,8,0.08)",
        color: !disabled ? "#FDFCF8" : "rgba(26,15,8,0.25)",
        cursor: !disabled ? "pointer" : "not-allowed",
      }}>
      {label}
    </button>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto"
         style={{ background: CANVAS }}>

      {/* Journey picker */}
      {phase === "journey-pick" && (
        <div className="min-h-screen flex flex-col">
          <div className="flex justify-end px-6 md:px-10 pt-6">
            <button onClick={close} aria-label="Close consultation"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col md:flex-row">
            <button onClick={() => startJourney("hair")}
              className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 group overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ backgroundColor: "rgba(26,15,8,0.03)" }} />
              <div className="relative text-center">
                <p className="font-body text-[11px] tracking-[5px] uppercase mb-4 text-[#9E8C7A]">Hair Care</p>
                <h2 className="font-display text-6xl md:text-7xl font-bold mb-5 text-[#2D1B0E]">HAIR</h2>
                <p className="font-body text-base text-[#6B5040] max-w-sm mx-auto leading-relaxed mb-10">
                  Curl pattern, porosity, density. Products matched to your exact texture.
                </p>
                <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">
                  Start Hair Quiz →
                </span>
              </div>
            </button>
            <div className="hidden md:flex items-center w-px"><div className="h-48 w-px bg-[rgba(26,15,8,0.08)]" /></div>
            <div className="md:hidden h-px w-full bg-[rgba(26,15,8,0.08)]" />
            <button onClick={() => startJourney("skin")}
              className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 group overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ backgroundColor: "rgba(26,15,8,0.03)" }} />
              <div className="relative text-center">
                <p className="font-body text-[11px] tracking-[5px] uppercase mb-4 text-[#9E8C7A]">Skin Care</p>
                <h2 className="font-display text-6xl md:text-7xl font-bold mb-5 text-[#6B5040]">SKIN</h2>
                <p className="font-body text-base text-[#6B5040] max-w-sm mx-auto leading-relaxed mb-10">
                  PIH, hyperpigmentation, dry skin. Formulated for melanin-rich skin specifically.
                </p>
                <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">
                  Start Skin Quiz →
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* HAIR Q1: curl type — 9-grid */}
      {phase === "hair-type" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 1 of ${HAIR_STEPS}`}
          title="Pick your curl type."
          hint="If you already know your number — go ahead. Not sure? Tap the closest match.">
          <div className="grid grid-cols-3 gap-3">
            {curlTypes.map((c) => {
              const sel = curl === c.id;
              return (
                <button key={c.id} onClick={() => setCurl(c.id)}
                  className="aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all"
                  style={{
                    borderColor: sel ? accent : "rgba(26,15,8,0.12)",
                    backgroundColor: sel ? accent + "0D" : "transparent",
                    boxShadow: sel ? `0 0 0 1.5px ${accent}` : "none",
                  }}>
                  <CurlGlyph type={c.id} color={sel ? accent : "rgba(26,15,8,0.45)"} size={40} />
                  <span className="font-display text-lg font-bold" style={{ color: sel ? accent : "#2D1B0E" }}>{c.label}</span>
                  <span className="font-body text-[10px] text-[#9E8C7A] px-2 text-center leading-tight">{c.desc}</span>
                </button>
              );
            })}
          </div>
          <ContinueBtn disabled={!curl} onClick={() => setPhase("porosity")} />
        </QuizFrame>
      )}

      {/* HAIR Q2: porosity */}
      {phase === "porosity" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 2 of ${HAIR_STEPS}`}
          title="What's your porosity?"
          hint="How well your hair absorbs and holds moisture.">
          <div className="flex flex-col gap-2.5">
            {porosityOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={porosity === opt.value}
                onClick={() => setPorosity(opt.value)}
                label={opt.label} sub={opt.desc} />
            ))}
            <button onClick={() => setShowPorosityHelp((v) => !v)}
              className="text-left mt-2 font-body text-sm font-medium underline-offset-4 hover:underline transition-colors"
              style={{ color: accent }}>
              {showPorosityHelp ? "Hide the test ↑" : "I don't know — show me how to test ↓"}
            </button>
            {showPorosityHelp && (
              <div className="mt-2 p-4 rounded-xl border border-[rgba(26,15,8,0.08)] bg-[#F7F5F0]">
                <p className="font-body text-sm font-semibold text-[#2D1B0E] mb-2">The water-glass test</p>
                <ol className="font-body text-sm text-[#6B5040] leading-relaxed list-decimal list-inside space-y-1">
                  <li>Take a clean shed strand of your hair.</li>
                  <li>Drop it in a glass of room-temp water.</li>
                  <li>Wait 2–3 minutes. Watch what it does:</li>
                </ol>
                <ul className="font-body text-sm text-[#6B5040] mt-2 space-y-1.5">
                  <li><span className="font-semibold" style={{ color: accent }}>Floats</span> → Low porosity</li>
                  <li><span className="font-semibold" style={{ color: accent }}>Floats midway</span> → Normal porosity</li>
                  <li><span className="font-semibold" style={{ color: accent }}>Sinks fast</span> → High porosity</li>
                </ul>
              </div>
            )}
          </div>
          <ContinueBtn disabled={!porosity} onClick={() => setPhase("hair-moisture")} />
        </QuizFrame>
      )}

      {/* HAIR Q3: moisture level */}
      {phase === "hair-moisture" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 3 of ${HAIR_STEPS}`}
          title="How does your hair feel most days?"
          hint="Think about an average day — not right after wash day.">
          <div className="flex flex-col gap-2.5">
            {moistureLevelOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={moisture === opt.value}
                onClick={() => setMoisture(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!moisture} onClick={() => setPhase("hair-loss")} />
        </QuizFrame>
      )}

      {/* HAIR Q4: hair loss */}
      {phase === "hair-loss" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 4 of ${HAIR_STEPS}`}
          title="How much hair are you losing?"
          hint="Not shedding — breakage, thinning, or loss you've noticed.">
          <div className="flex flex-col gap-2.5">
            {hairLossOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={hairLoss === opt.value}
                onClick={() => setHairLoss(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!hairLoss} onClick={() => setPhase("hair-scalp")} />
        </QuizFrame>
      )}

      {/* HAIR Q5: scalp health */}
      {phase === "hair-scalp" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 5 of ${HAIR_STEPS}`}
          title="How's your scalp?"
          hint="The foundation of everything. Be honest.">
          <div className="flex flex-col gap-2.5">
            {scalpHealthOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={scalpHealth === opt.value}
                onClick={() => setScalpHealth(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!scalpHealth} onClick={() => setPhase("hair-styling")} />
        </QuizFrame>
      )}

      {/* HAIR Q6: styling frustration */}
      {phase === "hair-styling" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 6 of ${HAIR_STEPS}`}
          title="Biggest styling frustration?"
          hint="The thing that makes you want to give up on wash day.">
          <div className="flex flex-col gap-2.5">
            {stylingFrustrationOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={stylingFrustration === opt.value}
                onClick={() => setStylingFrustration(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!stylingFrustration} onClick={() => setPhase("hair-goal")} />
        </QuizFrame>
      )}

      {/* HAIR Q7: goal */}
      {phase === "hair-goal" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow={`Hair · Step 7 of ${HAIR_STEPS}`}
          title="What's your #1 hair goal?"
          hint="If you could only fix one thing, what would it be?">
          <div className="flex flex-col gap-2.5">
            {hairGoalOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={hairGoal === opt.value}
                onClick={() => setHairGoal(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!hairGoal} onClick={() => setPhase("hair-convening")} label="See My Routine →" />
        </QuizFrame>
      )}

      {/* HAIR: convening */}
      {phase === "hair-convening" && (
        <Convening accent={accent} messages={hairMessages} onDone={() => setPhase("hair-results")} />
      )}

      {/* HAIR: results */}
      {phase === "hair-results" && hairTiered && (
        <TieredResults accent={accent}
          eyebrow="Your Hair Routine"
          title="Here's what we chose — and why."
          journey="hair"
          tiered={hairTiered}
          onClose={close} onReset={() => { reset(); setPhase("journey-pick"); }} />
      )}

      {/* SKIN Q1: wash feel */}
      {phase === "skin-wash-feel" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 1 of 4"
          title="After washing your face, how does your skin feel?"
          hint="Think about how it feels 10 minutes after cleansing — no products applied.">
          <div className="flex flex-col gap-2.5">
            {washFeelOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={washFeel === opt.value}
                onClick={() => setWashFeel(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!washFeel} onClick={() => setPhase("skin-ashy")} />
        </QuizFrame>
      )}

      {/* SKIN Q2: ashy patches */}
      {phase === "skin-ashy" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 2 of 4"
          title="Do you get ashy patches?"
          hint="White or grey cast on the skin — especially visible on darker skin tones.">
          <div className="flex flex-col gap-2.5">
            {ashyLevelOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={ashyLevel === opt.value}
                onClick={() => setAshyLevel(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!ashyLevel} onClick={() => setPhase("skin-reaction")} />
        </QuizFrame>
      )}

      {/* SKIN Q3: new product reaction */}
      {phase === "skin-reaction" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 3 of 4"
          title="How does your skin react to new products?"
          hint="Think about the last time you tried something new.">
          <div className="flex flex-col gap-2.5">
            {productReactionOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={productReaction === opt.value}
                onClick={() => setProductReaction(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!productReaction} onClick={() => setPhase("skin-finish")} />
        </QuizFrame>
      )}

      {/* SKIN Q4: midday finish */}
      {phase === "skin-finish" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 4 of 4"
          title="What's your natural finish by midday?"
          hint="No touch-ups, no blotting — how does your skin look and feel?">
          <div className="flex flex-col gap-2.5">
            {middayFinishOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={middayFinish === opt.value}
                onClick={() => setMiddayFinish(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!middayFinish} onClick={() => {
            if (washFeel && ashyLevel && productReaction && middayFinish) {
              setDetectedSkinType(determineSkinType(washFeel, ashyLevel, productReaction, middayFinish));
            }
            setPhase("skin-convening");
          }} label="Find My Skin Type →" />
        </QuizFrame>
      )}

      {phase === "skin-convening" && (
        <Convening accent={accent} messages={skinMessages} onDone={() => setPhase("skin-results")} />
      )}

      {phase === "skin-results" && detectedSkinType && skinTiered && (
        <TieredResults accent={accent}
          eyebrow={`Your Skin Type: ${auntySkinTypes.find((t) => t.value === detectedSkinType)?.label ?? ""}`}
          title={auntySkinTypes.find((t) => t.value === detectedSkinType)?.headline ?? "Here's what we chose — and why."}
          journey="skin"
          tiered={skinTiered}
          onClose={close} onReset={() => { reset(); setPhase("journey-pick"); }} />
      )}
    </div>
  );
}

// ── Tier section header ──────────────────────────────────────────────────
function TierHeader({ number, label, sublabel, accent }: { number: string; label: string; sublabel: string; accent: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-display text-[11px] font-bold tracking-[3px] uppercase px-2.5 py-1 rounded-full"
              style={{ backgroundColor: accent + "15", color: accent }}>
          {number}
        </span>
        <h3 className="font-display text-xl font-bold text-[#2D1B0E]">{label}</h3>
      </div>
      <p className="font-body text-sm text-[#6B5040] leading-relaxed">{sublabel}</p>
    </div>
  );
}

// ── Tiered Results screen ────────────────────────────────────────────────
function TieredResults({
  eyebrow, title, accent, journey, tiered, onClose, onReset,
}: {
  eyebrow: string; title: string; accent: string;
  journey: "hair" | "skin";
  tiered: TieredMatches;
  onClose: () => void; onReset: () => void;
}) {
  const [checkingOut, setCheckingOut] = useState(false);

  const tierPrice = (items: { productId: string }[]) =>
    items.reduce((sum, m) => sum + (getProductById(m.productId)?.price ?? 0), 0);

  const basicsPrice = tierPrice(tiered.basics);
  const essentialsPrice = tierPrice(tiered.essentials);
  const addonsPrice = tierPrice(tiered.addons);

  const handleCheckout = async (tier: "basics" | "essentials" | "everything") => {
    if (checkingOut) return;
    setCheckingOut(true);
    const cart =
      tier === "basics" ? tiered.basics
      : tier === "essentials" ? [...tiered.basics, ...tiered.essentials]
      : [...tiered.basics, ...tiered.essentials, ...tiered.addons];
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: cart.map((m) => ({ productId: m.productId, quantity: 1 })) }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
    } catch { /* fallback below */ }
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
          <p className="font-body text-sm text-[#9E8C7A] text-center mb-10">
            Three tiers. Start with the basics, add on when you&apos;re ready.
          </p>

          {/* ── TIER 1: BASICS ─────────────────────────────────────────── */}
          <TierHeader number="Tier 1" label="The Basics" accent={accent}
            sublabel={journey === "hair" ? "Your wash day foundation — cleanser, conditioner, styler." : "Cleanser + the core treatments for your skin type."} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.basics.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)] mb-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display text-base font-bold text-[#2D1B0E]">Start with the basics</p>
                <p className="font-body text-xs text-[#9E8C7A]">{tiered.basics.length} products · the essentials</p>
              </div>
              <p className="font-display text-2xl font-bold text-[#2D1B0E]">${basicsPrice}</p>
            </div>
            <button onClick={() => handleCheckout("basics")} disabled={checkingOut}
              className="w-full py-3.5 rounded-full font-body text-[12px] font-semibold tracking-[1px] uppercase transition-all hover:bg-[#1A0F08] active:scale-[0.98] disabled:opacity-60 bg-[#2D1B0E] text-[#FDFCF8]">
              {checkingOut ? "Sending to checkout…" : `Order Basics ($${basicsPrice}) →`}
            </button>
          </div>

          {/* ── TIER 2: BASICS + ESSENTIALS ────────────────────────────── */}
          <TierHeader number="Tier 2" label="Basics + Essentials" accent={accent}
            sublabel={journey === "hair" ? "Targeted treatments for your specific concerns." : "SPF + targeted serums for your skin's biggest needs."} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.essentials.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)] mb-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display text-base font-bold text-[#2D1B0E]">Basics + Essentials</p>
                <p className="font-body text-xs text-[#9E8C7A]">{tiered.basics.length + tiered.essentials.length} products · the full active routine</p>
              </div>
              <p className="font-display text-2xl font-bold text-[#2D1B0E]">${basicsPrice + essentialsPrice}</p>
            </div>
            <button onClick={() => handleCheckout("essentials")} disabled={checkingOut}
              className="w-full py-3.5 rounded-full font-body text-[12px] font-semibold tracking-[1px] uppercase transition-all hover:bg-[#1A0F08] active:scale-[0.98] disabled:opacity-60 bg-[#2D1B0E] text-[#FDFCF8]">
              {checkingOut ? "Sending to checkout…" : `Order Basics + Essentials ($${basicsPrice + essentialsPrice}) →`}
            </button>
          </div>

          {/* ── TIER 3: EVERYTHING ─────────────────────────────────────── */}
          <TierHeader number="Tier 3" label="The Full Stack" accent={accent}
            sublabel="Tools and accessories that amplify everything above." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {tiered.addons.map((m) => (
              <TierProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
            ))}
          </div>
          <div className="p-5 rounded-2xl border-2 mb-10" style={{ borderColor: accent, backgroundColor: accent + "08" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display text-base font-bold text-[#2D1B0E]">Everything — the complete routine</p>
                <p className="font-body text-xs text-[#9E8C7A]">{tiered.basics.length + tiered.essentials.length + tiered.addons.length} products · basics + essentials + add-ons</p>
              </div>
              <p className="font-display text-2xl font-bold text-[#2D1B0E]">${basicsPrice + essentialsPrice + addonsPrice}</p>
            </div>
            <button onClick={() => handleCheckout("everything")} disabled={checkingOut}
              className="w-full py-3.5 rounded-full font-body text-[12px] font-semibold tracking-[1px] uppercase transition-all hover:bg-[#1A0F08] active:scale-[0.98] disabled:opacity-60 bg-[#2D1B0E] text-[#FDFCF8]">
              {checkingOut ? "Sending to checkout…" : `Order Everything ($${basicsPrice + essentialsPrice + addonsPrice}) →`}
            </button>
          </div>

          {/* App preview */}
          <div className="border-t border-[rgba(26,15,8,0.06)] pt-8 pb-4 text-center">
            <p className="font-body text-[11px] tracking-[3px] uppercase mb-1" style={{ color: accent }}>Included with every order</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2D1B0E] mb-1">
              Your aunties, in your pocket.
            </h3>
            <p className="font-body text-sm text-[#6B5040]">
              Track your progress. Chat to your aunties. Get guided through every wash day.
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
    </div>
  );
}
