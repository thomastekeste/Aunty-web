"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/data/products";
import AppPreview from "@/components/AppPreview";
import {
  porosityOptions, densityOptions, struggleOptions, goalOptions,
  getProductMatches, getConveningMessages, getVerdicts,
  skinConcernOptions, skinTypeOptions, skinStruggleOptions, skinGoalOptions,
  getSkinProductMatches, getSkinConveningMessages, getSkinVerdicts,
  type HairCategory, type Porosity, type Density, type Struggle, type Goal,
  type SkinConcern, type SkinType, type SkinStruggle, type SkinGoal,
} from "@/data/quiz";

const BROWN = "#2D1B0E";
const MUTED = "#6B5040";
const CANVAS = "#FDFCF8";
const CANVAS_ALT = "#F7F5F0";

type Journey = "hair" | "skin" | null;

// 2A → 4C maps to the descriptive HairCategory used by the matcher
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
  // Hair
  | "hair-type" | "porosity" | "density" | "hair-struggle" | "hair-goal"
  | "hair-convening" | "hair-results"
  // Skin
  | "skin-concern" | "skin-type" | "skin-struggle" | "skin-goal"
  | "skin-convening" | "skin-results";

// ── Curl-pattern mini SVG ──────────────────────────────────────────────────
function CurlGlyph({ type, color, size = 44 }: { type: CurlType; color: string; size?: number }) {
  const stroke = color;
  const w = 2.2;
  // Procedural pattern based on category
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

// ── Product card — ingredient-first, horizontal-scroll friendly ───────────
function ProductCard({ productId, reason, accent }: { productId: string; reason: string; accent: string }) {
  const product = getProductById(productId);
  if (!product) return null;

  return (
    <div className="rounded-2xl overflow-hidden flex-shrink-0 w-[300px] border border-[rgba(26,15,8,0.06)]">
      <div className="relative flex items-center justify-center py-10 bg-[#F7F5F0]">
        <ProductIllustration type={product.productType} color={accent} />
      </div>
      <div className="p-5">
        <h4 className="font-display text-base font-bold text-[#2D1B0E] mb-2 leading-snug">{product.name}</h4>
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
        <p className="font-body text-xs text-[#6B5040] leading-relaxed mb-4">{reason}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-[#2D1B0E]">${product.price}</span>
          <span className="font-body text-[10px] font-semibold tracking-[1px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">
            Order
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Add-on card (compact) ────────────────────────────────────────────────────
function AddonCard({ productId, accent }: { productId: string; accent: string }) {
  const product = getProductById(productId);
  if (!product) return null;
  return (
    <div className="rounded-2xl overflow-hidden flex-shrink-0 w-[200px] border border-[rgba(26,15,8,0.06)]">
      <div className="flex items-center justify-center py-7 bg-[#F7F5F0]">
        <ProductIllustration type={product.productType} color={accent} />
      </div>
      <div className="p-4">
        <h4 className="font-display text-sm font-bold text-[#2D1B0E] mb-1.5 leading-snug">{product.name}</h4>
        {product.keyIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {product.keyIngredients.slice(0, 2).map((ing) => (
              <span key={ing} className="font-body text-[9px] px-2 py-0.5 rounded-full bg-[#F7F5F0] text-[#6B5040]">
                {ing}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-display text-base font-bold text-[#2D1B0E]">${product.price}</span>
          <span className="font-body text-[9px] font-semibold tracking-[1px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">+ Add</span>
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

// ── Multi-select chip ─────────────────────────────────────────────────────
function ChipButton({
  selected, onClick, label, sub, accent,
}: {
  selected: boolean; onClick: () => void; label: string; sub?: string; accent: string;
}) {
  return (
    <button onClick={onClick}
      className="text-left px-4 py-3 rounded-xl border transition-all duration-150"
      style={{
        borderColor: selected ? accent : "rgba(26,15,8,0.12)",
        backgroundColor: selected ? accent + "0D" : "transparent",
      }}>
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center"
             style={{ borderColor: selected ? accent : "rgba(26,15,8,0.25)", backgroundColor: selected ? accent : "transparent" }}>
          {selected && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5 L4.2 7.2 L8 3" stroke="#FDFCF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold text-[#2D1B0E] leading-snug">{label}</p>
          {sub && <p className="font-body text-xs text-[#6B5040] mt-0.5 leading-snug">{sub}</p>}
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
      {/* Top bar */}
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

      {/* Body */}
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
  const [density, setDensity] = useState<Density | null>(null);
  const [hairStruggles, setHairStruggles] = useState<Struggle[]>([]);
  const [hairGoals, setHairGoals] = useState<Goal[]>([]);

  // Skin state
  const [skinConcern, setSkinConcern] = useState<SkinConcern | null>(null);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [skinStruggles, setSkinStruggles] = useState<SkinStruggle[]>([]);
  const [skinGoal, setSkinGoal] = useState<SkinGoal | null>(null);

  // Open / close via #quiz hash
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#quiz");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const accent = journey === "skin" ? MUTED : BROWN;

  const reset = () => {
    setPhase("journey-pick"); setJourney(null);
    setCurl(null); setPorosity(null); setShowPorosityHelp(false); setDensity(null);
    setHairStruggles([]); setHairGoals([]);
    setSkinConcern(null); setSkinType(null);
    setSkinStruggles([]); setSkinGoal(null);
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
    setPhase(j === "hair" ? "hair-type" : "skin-concern");
  };

  const HAIR_STEPS = 5;
  const SKIN_STEPS = 4;
  const hairStep: Partial<Record<QuizPhase, number>> = {
    "hair-type": 0, "porosity": 1, "density": 2, "hair-struggle": 3, "hair-goal": 4,
    "hair-convening": 4, "hair-results": 4,
  };
  const skinStep: Partial<Record<QuizPhase, number>> = {
    "skin-concern": 0, "skin-type": 1, "skin-struggle": 2, "skin-goal": 3,
    "skin-convening": 3, "skin-results": 3,
  };

  const back = (() => {
    const map: Partial<Record<QuizPhase, () => void>> = {
      "hair-type": () => { setPhase("journey-pick"); setJourney(null); },
      "porosity": () => setPhase("hair-type"),
      "density": () => setPhase("porosity"),
      "hair-struggle": () => setPhase("density"),
      "hair-goal": () => setPhase("hair-struggle"),
      "skin-concern": () => { setPhase("journey-pick"); setJourney(null); },
      "skin-type": () => setPhase("skin-concern"),
      "skin-struggle": () => setPhase("skin-type"),
      "skin-goal": () => setPhase("skin-struggle"),
    };
    return map[phase];
  })();

  // Selected hair category derived from curl pick
  const hairCat: HairCategory | null = curl ? curlTypes.find((c) => c.id === curl)!.cat : null;

  const hairMatches = hairCat && porosity && density && hairStruggles.length > 0 && hairGoals.length > 0
    ? getProductMatches(hairCat, porosity, density, hairStruggles[0], hairGoals[0]) : [];
  const hairVerdicts = hairCat && porosity && hairStruggles.length > 0 && hairGoals.length > 0
    ? getVerdicts(hairCat, porosity, hairStruggles[0], hairGoals[0]) : [];
  const hairMessages = hairCat && porosity && hairStruggles.length > 0 && hairGoals.length > 0
    ? getConveningMessages(hairCat, porosity, hairStruggles[0], hairGoals[0]) : [];

  const skinMatches = skinConcern && skinType && skinStruggles.length > 0 && skinGoal
    ? getSkinProductMatches(skinConcern, skinType, skinStruggles[0], skinGoal) : [];
  const skinVerdicts = skinConcern && skinType && skinStruggles.length > 0 && skinGoal
    ? getSkinVerdicts(skinConcern, skinType, skinStruggles[0], skinGoal) : [];
  const skinMessages = skinConcern && skinType && skinStruggles.length > 0 && skinGoal
    ? getSkinConveningMessages(skinConcern, skinType, skinStruggles[0], skinGoal) : [];

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

      {/* HAIR: type — 9-grid 2A→4C */}
      {phase === "hair-type" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Hair · Step 1 of 5"
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

      {/* HAIR: porosity */}
      {phase === "porosity" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Hair · Step 2 of 5"
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
          <ContinueBtn disabled={!porosity} onClick={() => setPhase("density")} />
        </QuizFrame>
      )}

      {/* HAIR: density */}
      {phase === "density" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Hair · Step 3 of 5"
          title="How thick is your hair?"
          hint="Part it and look at your scalp. Density, not length.">
          <div className="flex flex-col gap-2.5">
            {densityOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={density === opt.value}
                onClick={() => setDensity(opt.value)}
                label={opt.label} sub={opt.desc} />
            ))}
          </div>
          <ContinueBtn disabled={!density} onClick={() => setPhase("hair-struggle")} />
        </QuizFrame>
      )}

      {/* HAIR: struggle (multi-select) */}
      {phase === "hair-struggle" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Hair · Step 4 of 5"
          title="What are you struggling with?"
          hint="Pick all that apply — be honest, aunty doesn't judge.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {struggleOptions.map((opt) => (
              <ChipButton key={opt.value} accent={accent}
                selected={hairStruggles.includes(opt.value)}
                onClick={() => setHairStruggles((cur) =>
                  cur.includes(opt.value) ? cur.filter((s) => s !== opt.value) : [...cur, opt.value]
                )}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={hairStruggles.length === 0} onClick={() => setPhase("hair-goal")} />
        </QuizFrame>
      )}

      {/* HAIR: goal (multi-select) */}
      {phase === "hair-goal" && (
        <QuizFrame step={hairStep[phase]!} total={HAIR_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Hair · Step 5 of 5"
          title="What's the win you're after?"
          hint="Pick everything you're working towards.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {goalOptions.map((opt) => (
              <ChipButton key={opt.value} accent={accent}
                selected={hairGoals.includes(opt.value)}
                onClick={() => setHairGoals((cur) =>
                  cur.includes(opt.value) ? cur.filter((g) => g !== opt.value) : [...cur, opt.value]
                )}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={hairGoals.length === 0} onClick={() => setPhase("hair-convening")} label="See My Routine →" />
        </QuizFrame>
      )}

      {/* HAIR: convening */}
      {phase === "hair-convening" && (
        <Convening accent={accent} messages={hairMessages} onDone={() => setPhase("hair-results")} />
      )}

      {/* HAIR: results */}
      {phase === "hair-results" && (
        <Results accent={accent}
          eyebrow="Your Hair Routine"
          title="Here's what we chose — and why."
          journey="hair"
          matches={hairMatches}
          onClose={close} onReset={() => { reset(); setPhase("journey-pick"); }} />
      )}

      {/* SKIN: concern */}
      {phase === "skin-concern" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 1 of 4"
          title="What's your main skin concern?"
          hint="Pick the one you most want to fix. We'll build the routine around it.">
          <div className="flex flex-col gap-2.5">
            {skinConcernOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={skinConcern === opt.value}
                onClick={() => setSkinConcern(opt.value)}
                label={opt.label} sub={opt.desc} />
            ))}
          </div>
          <ContinueBtn disabled={!skinConcern} onClick={() => setPhase("skin-type")} />
        </QuizFrame>
      )}

      {/* SKIN: type */}
      {phase === "skin-type" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 2 of 4"
          title="What's your skin type?"
          hint="How your skin behaves on an average day.">
          <div className="flex flex-col gap-2.5">
            {skinTypeOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={skinType === opt.value}
                onClick={() => setSkinType(opt.value)}
                label={opt.label} sub={opt.desc} />
            ))}
          </div>
          <ContinueBtn disabled={!skinType} onClick={() => setPhase("skin-struggle")} />
        </QuizFrame>
      )}

      {/* SKIN: struggle (multi-select) */}
      {phase === "skin-struggle" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 3 of 4"
          title="What's bothering you most?"
          hint="Pick all that apply.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skinStruggleOptions.map((opt) => (
              <ChipButton key={opt.value} accent={accent}
                selected={skinStruggles.includes(opt.value)}
                onClick={() => setSkinStruggles((cur) =>
                  cur.includes(opt.value) ? cur.filter((s) => s !== opt.value) : [...cur, opt.value]
                )}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={skinStruggles.length === 0} onClick={() => setPhase("skin-goal")} />
        </QuizFrame>
      )}

      {/* SKIN: goal */}
      {phase === "skin-goal" && (
        <QuizFrame step={skinStep[phase]!} total={SKIN_STEPS} accent={accent} onBack={back} onClose={close}
          eyebrow="Skin · Step 4 of 4"
          title="What does winning look like?"
          hint="Your biggest skin goal.">
          <div className="flex flex-col gap-2.5">
            {skinGoalOptions.map((opt) => (
              <OptionButton key={opt.value} accent={accent}
                selected={skinGoal === opt.value}
                onClick={() => setSkinGoal(opt.value)}
                label={opt.label} sub={opt.sub} />
            ))}
          </div>
          <ContinueBtn disabled={!skinGoal} onClick={() => setPhase("skin-convening")} label="See My Routine →" />
        </QuizFrame>
      )}

      {phase === "skin-convening" && (
        <Convening accent={accent} messages={skinMessages} onDone={() => setPhase("skin-results")} />
      )}

      {phase === "skin-results" && (
        <Results accent={accent}
          eyebrow="Your Skin Routine"
          title="Here's what we chose — and why."
          journey="skin"
          matches={skinMatches}
          onClose={close} onReset={() => { reset(); setPhase("journey-pick"); }} />
      )}
    </div>
  );
}

// ── Results screen ────────────────────────────────────────────────────────
function Results({
  eyebrow, title, accent, journey, matches, onClose, onReset,
}: {
  eyebrow: string; title: string; accent: string;
  journey: "hair" | "skin";
  matches: { productId: string; reason: string }[];
  onClose: () => void; onReset: () => void;
}) {
  const [step, setStep] = useState<"products" | "ordered">("products");
  const [checkingOut, setCheckingOut] = useState(false);

  const addonIds = journey === "hair"
    ? ["scalp-serum", "growth-oil", "satin-bonnet"]
    : ["derma-roller", "ice-roller", "silicone-face-scrubber"];
  const matchedIds = new Set(matches.map((m) => m.productId));
  const addons = addonIds.filter((id) => !matchedIds.has(id));

  const allProducts = [
    ...matches.map((m) => m.productId),
    ...addons,
  ];
  const totalPrice = allProducts.reduce((sum, id) => {
    const p = getProductById(id);
    return sum + (p?.price ?? 0);
  }, 0);

  const handleCheckout = async () => {
    if (checkingOut) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: allProducts.map((id) => ({ productId: id, quantity: 1 })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      // Fallback: show local confirmation
      setStep("ordered");
    } catch {
      setStep("ordered");
    } finally {
      setCheckingOut(false);
    }
  };

  const CloseBtn = () => (
    <button onClick={onClose} aria-label="Close consultation"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    </button>
  );

  if (step === "ordered") {
    return (
      <div className="min-h-screen flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4 flex-shrink-0">
          <button onClick={() => setStep("products")}
            className="font-body text-xs text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
            ← Back
          </button>
          <p className="font-body text-[11px] tracking-[3px] uppercase" style={{ color: accent }}>{eyebrow}</p>
          <CloseBtn />
        </div>

        {/* Order confirmed */}
        <div className="flex flex-col items-center px-6 text-center pt-6 pb-14">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2"
                 style={{ borderColor: accent }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L10 18L19 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-body text-[11px] tracking-[3px] uppercase mb-3" style={{ color: accent }}>Order confirmed</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-4 leading-[1.1]">
              We&apos;re in the lab making it for you.
            </h2>
            <p className="font-body text-base text-[#6B5040] leading-relaxed">
              Your products ship in 4–6 weeks, freshly formulated for your profile.
            </p>
          </div>
        </div>

        {/* App — not optional, it's part of what they get */}
        <div className="border-t border-[rgba(26,15,8,0.06)] pt-3 pb-4 px-6 text-center">
          <p className="font-body text-[11px] tracking-[3px] uppercase mb-1" style={{ color: accent }}>Included with your order</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2D1B0E] mb-1">
            Your aunties, in your pocket.
          </h3>
          <p className="font-body text-sm text-[#6B5040]">
            Track your progress. Chat to your aunties. Get guided through every wash day.
          </p>
        </div>

        {/* Interactive app mock — rendered inline */}
        <AppPreview hideCta />

        <div className="py-8 text-center">
          <button onClick={onClose}
            className="font-body text-sm text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
            Close consultation
          </button>
        </div>
      </div>
    );
  }

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
          <p className="font-body text-sm text-[#9E8C7A] text-center mb-8">
            Ingredient-matched to your exact profile.
          </p>

          {/* Core products — horizontal scroll */}
          <div className="-mx-6 md:-mx-10 px-6 md:px-10 overflow-x-auto pb-4 mb-8">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {matches.map((m) => (
                <ProductCard key={m.productId} productId={m.productId} reason={m.reason} accent={accent} />
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {addons.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#2D1B0E]">Complete the routine</h3>
                  <p className="font-body text-xs text-[#9E8C7A] mt-0.5">Aunty-recommended add-ons</p>
                </div>
              </div>
              <div className="-mx-6 md:-mx-10 px-6 md:px-10 overflow-x-auto pb-2">
                <div className="flex gap-3" style={{ width: "max-content" }}>
                  {addons.map((id) => (
                    <AddonCard key={id} productId={id} accent={accent} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Order CTA */}
          <div className="p-6 rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="font-display text-lg font-bold text-[#2D1B0E] mb-1">Your full routine</p>
                <p className="font-body text-sm text-[#6B5040] leading-relaxed">
                  {allProducts.length} products · formulated fresh for your profile<br />
                  <span className="text-[#9E8C7A] text-xs">Ships in 4–6 weeks once we make it for you</span>
                </p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="font-display text-2xl font-bold text-[#2D1B0E]">${totalPrice}</p>
                <p className="font-body text-[10px] text-[#9E8C7A]">{allProducts.length} items</p>
              </div>
            </div>
            <button onClick={handleCheckout} disabled={checkingOut}
              className="w-full py-4 rounded-full font-body text-[13px] font-semibold tracking-[1px] uppercase transition-all hover:bg-[#1A0F08] active:scale-[0.98] disabled:opacity-60 bg-[#2D1B0E] text-[#FDFCF8]">
              {checkingOut ? "Sending you to checkout…" : `Order all ${allProducts.length} ($${totalPrice}) →`}
            </button>
            <p className="font-body text-[10px] text-[#9E8C7A] text-center mt-3">
              Secure checkout · ships in 4–6 weeks
            </p>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
