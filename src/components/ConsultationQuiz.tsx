"use client";

import { useEffect, useState } from "react";
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

import CurlGlyph, { type CurlType } from "./quiz/CurlGlyph";
import Convening from "./quiz/Convening";
import OptionButton from "./quiz/OptionButton";
import QuizFrame from "./quiz/QuizFrame";
import TieredResults from "./quiz/TieredResults";
import JourneyPicker from "./quiz/JourneyPicker";
import { getAunty, type Aunty } from "@/data/aunties";
import { SELECTED_AUNTY_KEY } from "./AuntySelectorHero";
import AuntyGuide, { type GuidePhase } from "./AuntyGuide";

const BROWN = "#2D1B0E";
const MUTED = "#6B5040";
const CANVAS = "#FDFCF8";

type Journey = "hair" | "skin" | null;

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

  // Selected aunty (picked from AuntySelectorHero on homepage)
  const [aunty, setAunty] = useState<Aunty | null>(null);

  useEffect(() => {
    const readAunty = () => {
      try {
        const id = sessionStorage.getItem(SELECTED_AUNTY_KEY);
        setAunty(id ? getAunty(id) : null);
      } catch {
        setAunty(null);
      }
    };
    const sync = () => {
      const isOpen = window.location.hash === "#quiz";
      setOpen(isOpen);
      if (isOpen) readAunty();
    };
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

  const hairCat: HairCategory | null = curl ? (curlTypes.find((c) => c.id === curl)?.cat ?? null) : null;

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

      {/* Aunty guide — shows the selected aunty + her voice throughout the quiz */}
      {aunty && <AuntyGuide aunty={aunty} phase={phase as GuidePhase} />}

      {/* Journey picker */}
      {phase === "journey-pick" && (
        <JourneyPicker onSelect={startJourney} onClose={close} />
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
          verdicts={hairVerdicts}
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

      {/* SKIN: convening */}
      {phase === "skin-convening" && (
        <Convening accent={accent} messages={skinMessages} onDone={() => setPhase("skin-results")} />
      )}

      {/* SKIN: results */}
      {phase === "skin-results" && detectedSkinType && skinTiered && (
        <TieredResults accent={accent}
          eyebrow={`Your Skin Type: ${auntySkinTypes.find((t) => t.value === detectedSkinType)?.label ?? ""}`}
          title={auntySkinTypes.find((t) => t.value === detectedSkinType)?.headline ?? "Here's what we chose — and why."}
          journey="skin"
          tiered={skinTiered}
          verdicts={skinVerdicts}
          onClose={close} onReset={() => { reset(); setPhase("journey-pick"); }} />
      )}
    </div>
  );
}
