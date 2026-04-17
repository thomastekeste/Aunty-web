"use client";

import { useState, useEffect, useRef } from "react";
import AuntyAvatar from "./AuntyAvatar";
import CurlPatternIcon from "./CurlPatternIcon";
import { aunties, getAunty } from "@/data/aunties";
import {
  curlOptions,
  curlCategories,
  type CurlType,
} from "@/data/quiz";

type Step = "intro" | "carousel" | "quiz" | "react" | "verdict";

const features = [
  {
    tag: "Your Council",
    title: "7 Aunties Who Know Your Hair",
    desc: "From West Africa to the Caribbean \u2014 each aunty brings generations of real hair wisdom to your phone.",
  },
  {
    tag: "Know Your Pattern",
    title: "Every Curl Type, Covered",
    desc: "From 2A waves to 4C coils \u2014 your aunties know every texture and exactly how to care for it.",
  },
  {
    tag: "Custom Rituals",
    title: "A Routine Built for You",
    desc: "Wash days, styling days, rest days \u2014 all mapped to your curl pattern and lifestyle.",
  },
  {
    tag: "Adapts to You",
    title: "Weekly Check-ins That Evolve",
    desc: "Your plan changes as your hair does. Because no two weeks are the same.",
  },
];

const ritualDays = [
  { day: "M", color: "#D4A04A", label: "Wash" },
  { day: "T", color: "#C2456E", label: "Style" },
  { day: "W", color: "#7B3F6B", label: "Refresh" },
  { day: "T", color: "#2A7B7B", label: "Rest" },
  { day: "F", color: "#1A7A4A", label: "Scalp" },
  { day: "S", color: "#B85C2A", label: "Strength" },
  { day: "S", color: "#3D5A99", label: "Protect" },
];

function getCurlReaction(curl: CurlType): string {
  if (curl.startsWith("2")) return "Wavy hair. Let\u2019s work with those waves.";
  if (curl.startsWith("3")) return "Those curls. I know exactly what they need.";
  return "Crown texture. Let\u2019s take care of it.";
}

function getSneakPeekVerdict(curl: CurlType) {
  if (curl.startsWith("2")) {
    return {
      auntyId: "carmen",
      message:
        "Mira! Those waves have so much life. In the full app, I\u2019d build you a complete routine \u2014 wash days, products, everything.",
    };
  }
  if (curl.startsWith("3")) {
    return {
      auntyId: "ngozi",
      message:
        "I KNOW those curls. In the full app, I\u2019d give you a whole wash day ritual, product picks, the works.",
    };
  }
  return {
    auntyId: "amara",
    message:
      "Your coils carry so much strength. In the full app, I\u2019d map out everything \u2014 moisture, protection, growth.",
  };
}

export default function ConsultationQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [slide, setSlide] = useState(0);
  const [curl, setCurl] = useState<CurlType | null>(null);
  const touchRef = useRef<{ startX: number } | null>(null);

  const isOverlay = step !== "intro";

  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOverlay]);

  useEffect(() => {
    if (step === "react") {
      const t = setTimeout(() => setStep("verdict"), 1800);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleClose = () => {
    setStep("intro");
    setSlide(0);
    setCurl(null);
  };

  const handleBack = () => {
    if (step === "carousel" && slide > 0) {
      setSlide((s) => s - 1);
    } else if (step === "quiz") {
      setSlide(features.length - 1);
      setStep("carousel");
    } else {
      handleClose();
    }
  };

  const handleComplete = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const nextSlide = () => {
    if (slide < features.length - 1) setSlide((s) => s + 1);
  };

  const prevSlide = () => {
    if (slide > 0) setSlide((s) => s - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { startX: e.touches[0].clientX };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    touchRef.current = null;
  };

  const totalSteps = features.length + 2;
  const currentStep =
    step === "carousel"
      ? slide + 1
      : step === "quiz"
        ? features.length + 1
        : step === "react" || step === "verdict"
          ? totalSteps
          : 0;
  const progress = currentStep / totalSteps;

  // ─── Intro (in-page) ───
  if (step === "intro") {
    return (
      <section id="quiz" className="relative py-24 md:py-32 bg-[#1A0F08] noise overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4A04A] opacity-[0.03] blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Inside The App
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FEF8EC] mb-4 leading-tight">
            See What Your <br className="hidden md:block" />
            Aunties Can Do
          </h2>
          <p className="font-body text-lg text-[rgba(254,248,236,0.55)] mb-4 max-w-lg mx-auto">
            Swipe through what&rsquo;s inside &mdash; then try a sneak peek of the full questionnaire.
          </p>
          <p className="font-body text-sm text-[rgba(254,248,236,0.3)] mb-10">
            Takes about 30 seconds. No sign-up required.
          </p>
          <button
            onClick={() => setStep("carousel")}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-bold text-base hover:bg-[#B8862E] transition-colors animate-pulse-glow"
          >
            Take A Sneak Peek
          </button>
          <div className="mt-8 flex items-center justify-center gap-6 text-[rgba(254,248,236,0.25)]">
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              No data stored
            </span>
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              30 seconds
            </span>
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              100% free
            </span>
          </div>
        </div>
      </section>
    );
  }

  // ─── Full-screen overlay ───
  return (
    <>
      <section id="quiz" />
      <div className="fixed inset-0 z-50 bg-[#1A0F08] flex flex-col">
        {/* Top bar */}
        <div className="flex-shrink-0 px-6 pt-4 pb-2">
          <button
            onClick={handleBack}
            className="text-[rgba(254,248,236,0.4)] hover:text-[#FEF8EC] transition-colors text-2xl mb-3"
            aria-label="Back"
          >
            &larr;
          </button>
          <div className="h-[3px] bg-[rgba(254,248,236,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #D4A04A, #B8862E)",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* ─── Carousel ─── */}
          {step === "carousel" && (
            <div className="flex flex-col flex-1 min-h-0">
              <div
                className="flex-1 min-h-0 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="w-full flex-shrink-0 flex flex-col items-center justify-center px-8 text-center"
                    >
                      <div className="mb-5">
                        {i === 0 && <CouncilVisual />}
                        {i === 1 && <CurlChartVisual />}
                        {i === 2 && <RitualVisual />}
                        {i === 3 && <CheckInVisual />}
                      </div>

                      <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-2">
                        {feature.tag}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#FEF8EC] leading-snug mb-3">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-[rgba(254,248,236,0.5)] max-w-sm">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: dots + action */}
              <div className="flex-shrink-0 px-6 pb-6 pt-3">
                <div className="flex justify-center gap-2 mb-4">
                  {features.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === slide
                          ? "w-6 bg-[#D4A04A]"
                          : "w-1.5 bg-[rgba(254,248,236,0.15)]"
                      }`}
                    />
                  ))}
                </div>

                {slide < features.length - 1 ? (
                  <button
                    onClick={nextSlide}
                    className="w-full py-3.5 rounded-full border border-[rgba(254,248,236,0.12)] text-[#FEF8EC] font-body font-medium hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => setStep("quiz")}
                    className="w-full py-3.5 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-bold hover:bg-[#B8862E] transition-colors"
                  >
                    Try The Sneak Peek Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ─── Curl Selection (sneak peek quiz) ─── */}
          {step === "quiz" && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="max-w-lg mx-auto px-6 py-4 md:py-8 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-body text-[10px] tracking-[2px] uppercase text-[#D4A04A] bg-[rgba(212,160,74,0.1)] px-2.5 py-1 rounded-full">
                    Sneak Peek
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#FEF8EC] leading-snug mb-2">
                  What&rsquo;s your curl pattern?
                </h3>
                <p className="font-body text-sm text-[rgba(254,248,236,0.4)] mb-6">
                  Pick your closest match. Your aunties will take it from here.
                </p>

                {curlCategories.map((cat) => (
                  <div key={cat.label} className="mb-5">
                    <p className="font-body text-[10px] tracking-[3px] uppercase text-[rgba(254,248,236,0.4)] mb-3">
                      {cat.label}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {cat.types.map((type) => {
                        const opt = curlOptions.find((o) => o.type === type)!;
                        const selected = curl === type;
                        return (
                          <button
                            key={type}
                            onClick={() => {
                              setCurl(type);
                              setTimeout(() => setStep("react"), 300);
                            }}
                            className={`rounded-xl px-2 py-3 text-center border transition-all duration-200 ${
                              selected
                                ? "border-[#D4A04A] bg-[rgba(212,160,74,0.12)] scale-[1.03]"
                                : "border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]"
                            }`}
                          >
                            <div className="flex justify-center mb-1.5">
                              <CurlPatternIcon
                                type={type}
                                size={52}
                                color={selected ? "#D4A04A" : "rgba(254,248,236,0.45)"}
                              />
                            </div>
                            <p className={`font-body text-sm font-bold ${selected ? "text-[#D4A04A]" : "text-[rgba(254,248,236,0.6)]"}`}>
                              {opt.label}
                            </p>
                            <p className="font-body text-[10px] text-[rgba(254,248,236,0.3)]">
                              {opt.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Quick Reaction ─── */}
          {step === "react" && curl && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-fade-in-up">
              <AuntyAvatar
                color={getAunty(getSneakPeekVerdict(curl).auntyId).color}
                size={56}
                glow
              />
              <p className="font-display text-xl md:text-2xl font-bold text-[#FEF8EC] mt-5 max-w-sm">
                {getCurlReaction(curl)}
              </p>
            </div>
          )}

          {/* ─── Sneak Peek Verdict ─── */}
          {step === "verdict" && curl && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <SneakPeekVerdict curl={curl} onComplete={handleComplete} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Carousel Visuals ───

function CouncilVisual() {
  return (
    <div className="flex items-center justify-center -space-x-1">
      {aunties.map((aunty) => (
        <AuntyAvatar key={aunty.id} color={aunty.color} size={38} />
      ))}
    </div>
  );
}

function CurlChartVisual() {
  const categories = [
    { label: "Wavy", types: ["2a", "2b", "2c"] as CurlType[] },
    { label: "Curly", types: ["3a", "3b", "3c"] as CurlType[] },
    { label: "Coily", types: ["4a", "4b", "4c"] as CurlType[] },
  ];

  return (
    <div className="grid grid-cols-3 gap-x-4 md:gap-x-6 gap-y-1">
      {categories.map((cat) => (
        <div key={cat.label} className="flex flex-col items-center">
          <p className="font-body text-[7px] md:text-[8px] tracking-[2px] uppercase text-[rgba(254,248,236,0.3)] mb-1">
            {cat.label}
          </p>
          <div className="flex flex-col gap-1">
            {cat.types.map((type) => {
              const opt = curlOptions.find((o) => o.type === type)!;
              return (
                <div
                  key={type}
                  className="flex items-center gap-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(254,248,236,0.06)] pl-1.5 pr-2.5 py-1"
                >
                  <CurlPatternIcon type={type} size={22} color="rgba(254,248,236,0.5)" />
                  <p className="font-body text-[9px] md:text-[10px] font-bold text-[rgba(254,248,236,0.5)]">
                    {opt.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function RitualVisual() {
  return (
    <div className="flex items-center justify-center gap-2.5">
      {ritualDays.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className="font-body text-[10px] text-[rgba(254,248,236,0.4)]">
            {d.day}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: d.color + "20" }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color }}
            />
          </div>
          <span className="font-body text-[7px] text-[rgba(254,248,236,0.3)]">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CheckInVisual() {
  const weeks = [
    { label: "Wk 1", height: 24, opacity: "30" },
    { label: "Wk 2", height: 40, opacity: "50" },
    { label: "Wk 3", height: 56, opacity: "80" },
    { label: "Wk 4", height: 72, opacity: "CC" },
  ];

  return (
    <div className="flex items-end justify-center gap-3">
      {weeks.map((w) => (
        <div key={w.label} className="flex flex-col items-center gap-2">
          <div
            className="w-10 rounded-t-md"
            style={{
              height: `${w.height}px`,
              backgroundColor: `#D4A04A${w.opacity}`,
            }}
          />
          <span className="font-body text-[8px] text-[rgba(254,248,236,0.3)]">
            {w.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Sneak Peek Verdict ───

function SneakPeekVerdict({
  curl,
  onComplete,
}: {
  curl: CurlType;
  onComplete: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const verdict = getSneakPeekVerdict(curl);
  const aunty = getAunty(verdict.auntyId);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-8">
      <div className="text-center mb-8 animate-fade-in-up">
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-3">
          Sneak Peek Result
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[#FEF8EC]">
          Here&rsquo;s a taste
        </h3>
      </div>

      <div className="w-full max-w-lg space-y-4 mb-8">
        {/* Unlocked verdict */}
        <div
          className="rounded-xl p-5 transition-all duration-500"
          style={{
            backgroundColor: `${aunty.color}10`,
            border: `1px solid ${aunty.color}25`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <AuntyAvatar color={aunty.color} size={36} />
            <div>
              <p className="font-body text-sm font-semibold" style={{ color: aunty.color }}>
                {aunty.name}
              </p>
              <p className="font-body text-[10px] text-[rgba(254,248,236,0.4)]">
                {aunty.title}
              </p>
            </div>
          </div>
          <p className="font-display text-base italic text-[#FEF8EC] leading-relaxed">
            &ldquo;{verdict.message}&rdquo;
          </p>
        </div>

        {/* Locked cards */}
        {[getAunty("denise"), getAunty("fatou")].map((locked) => (
          <div
            key={locked.id}
            className="rounded-xl p-5 relative overflow-hidden transition-all duration-500"
            style={{
              backgroundColor: "rgba(254,248,236,0.03)",
              border: "1px solid rgba(254,248,236,0.06)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="blur-[6px] pointer-events-none">
              <div className="flex items-center gap-3 mb-3">
                <AuntyAvatar color={locked.color} size={36} />
                <div>
                  <p className="font-body text-sm font-semibold text-[rgba(254,248,236,0.3)]">
                    {locked.name}
                  </p>
                  <p className="font-body text-[10px] text-[rgba(254,248,236,0.2)]">
                    {locked.title}
                  </p>
                </div>
              </div>
              <p className="font-display text-base italic text-[rgba(254,248,236,0.15)] leading-relaxed">
                &ldquo;Your personalized advice is waiting inside the full app...&rdquo;
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-xs text-[rgba(254,248,236,0.5)] bg-[rgba(26,15,8,0.85)] px-4 py-2 rounded-full border border-[rgba(254,248,236,0.08)]">
                Unlock in the full app
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="w-full max-w-lg transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "400ms",
        }}
      >
        <div className="rounded-2xl bg-[rgba(212,160,74,0.08)] border border-[rgba(212,160,74,0.2)] p-6 text-center">
          <p className="font-display text-xl font-bold text-[#FEF8EC] mb-2">
            Your full plan is ready.
          </p>
          <p className="font-body text-sm text-[rgba(254,248,236,0.5)] mb-5">
            Get early access to your complete personalized ritual.
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3.5 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-bold hover:bg-[#B8862E] transition-colors"
          >
            Become a Founding Member
          </button>
        </div>
      </div>
    </div>
  );
}
