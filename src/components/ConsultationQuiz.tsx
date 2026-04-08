"use client";

import { useState, useEffect, useCallback } from "react";
import AuntyAvatar from "./AuntyAvatar";
import CurlPatternIcon from "./CurlPatternIcon";
import QuizValidation from "./QuizValidation";
import ConveningCeremony from "./ConveningCeremony";
import VerdictReveal from "./VerdictReveal";
import { getAunty } from "@/data/aunties";
import {
  curlOptions,
  curlCategories,
  struggleOptions,
  goalOptions,
  getCurlValidation,
  empathyValidation,
  getVerdicts,
  type CurlType,
  type Struggle,
  type Goal,
} from "@/data/quiz";

type Step =
  | "intro"
  | "curl"
  | "validate-curl"
  | "struggle"
  | "validate-struggle"
  | "goal"
  | "convening"
  | "verdict";

const STEP_PROGRESS: Record<Step, number> = {
  intro: 0,
  curl: 1,
  "validate-curl": 1.5,
  struggle: 2,
  "validate-struggle": 2.5,
  goal: 3,
  convening: 3.5,
  verdict: 4,
};

// Which aunty hosts each question
const HOSTS = {
  curl: "ngozi",
  struggle: "amara",
  goal: "carmen",
};

export default function ConsultationQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [curl, setCurl] = useState<CurlType | null>(null);
  const [struggle, setStruggle] = useState<Struggle | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [questionRevealed, setQuestionRevealed] = useState(false);

  const isOverlay = step !== "intro";

  // Lock body scroll when overlay is active
  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOverlay]);

  // Show "Next" button 700ms after selection
  useEffect(() => {
    if (
      (step === "curl" && curl) ||
      (step === "struggle" && struggle) ||
      (step === "goal" && goal)
    ) {
      setShowNext(false);
      const t = setTimeout(() => setShowNext(true), 700);
      return () => clearTimeout(t);
    }
  }, [step, curl, struggle, goal]);

  // Reset question state on step change
  useEffect(() => {
    setQuestionRevealed(false);
    setShowNext(false);
  }, [step]);

  const handleClose = () => {
    setStep("intro");
    setCurl(null);
    setStruggle(null);
    setGoal(null);
  };

  const handleStart = () => {
    setStep("curl");
  };

  const progress = STEP_PROGRESS[step] / 4;

  // ─── Intro state (in-page) ───
  if (step === "intro") {
    return (
      <section id="quiz" className="relative py-24 md:py-32 bg-[#1A0F08] noise overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4A04A] opacity-[0.03] blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Free Mini Consultation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FEF8EC] mb-4 leading-tight">
            Let Your Aunties <br className="hidden md:block" />
            See That Hair
          </h2>
          <p className="font-body text-lg text-[rgba(254,248,236,0.55)] mb-4 max-w-lg mx-auto">
            Three quick questions. Your council convenes. You get a personalized teaser verdict — free.
          </p>
          <p className="font-body text-sm text-[rgba(254,248,236,0.3)] mb-10">
            Takes about 60 seconds. No sign-up required.
          </p>

          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-bold text-base hover:bg-[#B8862E] transition-colors animate-pulse-glow"
          >
            Start The Consultation
          </button>

          {/* Trust signals */}
          <div className="mt-8 flex items-center justify-center gap-6 text-[rgba(254,248,236,0.25)]">
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              No data stored
            </span>
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              60 seconds
            </span>
            <span className="font-body text-xs flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
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
      {/* Anchor for scroll */}
      <section id="quiz" />

      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-[#1A0F08] flex flex-col">
        {/* Top bar */}
        <div className="flex-shrink-0 px-6 pt-4 pb-2">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="text-[rgba(254,248,236,0.4)] hover:text-[#FEF8EC] transition-colors text-2xl mb-3"
            aria-label="Close quiz"
          >
            &larr;
          </button>

          {/* Progress bar */}
          <div className="h-[3px] bg-[rgba(254,248,236,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #D4A04A, #B8862E)",
              }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {/* ─── Curl Type ─── */}
          {step === "curl" && (
            <QuizStep
              auntyId={HOSTS.curl}
              question="Let Aunty see your pattern. Which one looks like you?"
              prompt="Come sit, let Aunty see this hair."
              onQuestionRevealed={() => setQuestionRevealed(true)}
            >
              {questionRevealed && (
                <div className="animate-fade-in-up">
                  {curlCategories.map((cat) => (
                    <div key={cat.label} className="mb-6">
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
                              onClick={() => setCurl(type)}
                              className={`rounded-xl p-3 text-center border transition-all duration-200 ${
                                selected
                                  ? "border-[#D4A04A] bg-[rgba(212,160,74,0.12)]"
                                  : "border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]"
                              }`}
                            >
                              <div className="flex justify-center mb-1">
                                <CurlPatternIcon
                                  type={type}
                                  size={32}
                                  color={selected ? "#D4A04A" : "rgba(254,248,236,0.3)"}
                                />
                              </div>
                              <p
                                className={`font-body text-sm font-bold ${
                                  selected ? "text-[#D4A04A]" : "text-[rgba(254,248,236,0.5)]"
                                }`}
                              >
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

                  {/* Aunty's reaction */}
                  {curl && (
                    <p className="mt-4 text-center font-display text-base italic text-[#D4A04A] animate-fade-in-up">
                      {curl.startsWith("2")
                        ? "Beautiful. Let's work with those waves."
                        : curl.startsWith("3")
                          ? "Love those curls. We know exactly what they need."
                          : "Crown texture. Let's take care of it."}
                    </p>
                  )}

                  {/* Next button */}
                  {showNext && (
                    <div className="mt-6 text-center animate-fade-in-up">
                      <button
                        onClick={() => setStep("validate-curl")}
                        className="px-8 py-3 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-semibold hover:bg-[#B8862E] transition-colors"
                      >
                        That&rsquo;s my curl
                      </button>
                    </div>
                  )}
                </div>
              )}
            </QuizStep>
          )}

          {/* ─── Validation: Curl ─── */}
          {step === "validate-curl" && curl && (
            <QuizValidation
              auntyId={HOSTS.curl}
              lines={getCurlValidation(curl)}
              onComplete={() => setStep("struggle")}
            />
          )}

          {/* ─── Struggle ─── */}
          {step === "struggle" && (
            <QuizStep
              auntyId={HOSTS.struggle}
              question="What's your biggest struggle right now?"
              prompt="Tell me where it hurts, dear one."
              onQuestionRevealed={() => setQuestionRevealed(true)}
            >
              {questionRevealed && (
                <div className="animate-fade-in-up grid gap-3">
                  {struggleOptions.map((opt) => {
                    const selected = struggle === opt.value;
                    const hostColor = getAunty(HOSTS.struggle).color;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setStruggle(opt.value)}
                        className={`rounded-xl px-5 py-4 text-left border transition-all duration-200 ${
                          selected
                            ? "bg-[rgba(184,92,42,0.12)]"
                            : "border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]"
                        }`}
                        style={selected ? { borderColor: hostColor + "60" } : {}}
                      >
                        <p
                          className={`font-body font-medium ${
                            selected ? "text-[#FEF8EC]" : "text-[rgba(254,248,236,0.6)]"
                          }`}
                        >
                          {opt.label}
                        </p>
                        <p className="font-body text-xs text-[rgba(254,248,236,0.3)] mt-0.5">
                          {opt.sub}
                        </p>
                      </button>
                    );
                  })}

                  {showNext && (
                    <div className="mt-4 text-center animate-fade-in-up">
                      <button
                        onClick={() => setStep("validate-struggle")}
                        className="px-8 py-3 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-semibold hover:bg-[#B8862E] transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </QuizStep>
          )}

          {/* ─── Validation: Empathy ─── */}
          {step === "validate-struggle" && (
            <QuizValidation
              auntyId="denise"
              lines={empathyValidation}
              onComplete={() => setStep("goal")}
            />
          )}

          {/* ─── Goal ─── */}
          {step === "goal" && (
            <QuizStep
              auntyId={HOSTS.goal}
              question="What's your dream for your hair?"
              prompt="Tell me what would make you feel amazing, mi amor."
              onQuestionRevealed={() => setQuestionRevealed(true)}
            >
              {questionRevealed && (
                <div className="animate-fade-in-up grid gap-3">
                  {goalOptions.map((opt) => {
                    const selected = goal === opt.value;
                    const hostColor = getAunty(HOSTS.goal).color;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setGoal(opt.value)}
                        className={`rounded-xl px-5 py-4 text-left border transition-all duration-200 ${
                          selected
                            ? "bg-[rgba(194,69,110,0.12)]"
                            : "border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]"
                        }`}
                        style={selected ? { borderColor: hostColor + "60" } : {}}
                      >
                        <p
                          className={`font-body font-medium ${
                            selected ? "text-[#FEF8EC]" : "text-[rgba(254,248,236,0.6)]"
                          }`}
                        >
                          {opt.label}
                        </p>
                        <p className="font-body text-xs text-[rgba(254,248,236,0.3)] mt-0.5">
                          {opt.sub}
                        </p>
                      </button>
                    );
                  })}

                  {showNext && (
                    <div className="mt-4 text-center animate-fade-in-up">
                      <button
                        onClick={() => setStep("convening")}
                        className="px-8 py-3 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-semibold hover:bg-[#B8862E] transition-colors"
                      >
                        Summon The Council
                      </button>
                    </div>
                  )}
                </div>
              )}
            </QuizStep>
          )}

          {/* ─── Convening ─── */}
          {step === "convening" && curl && struggle && goal && (
            <ConveningCeremony
              curl={curl}
              struggle={struggle}
              goal={goal}
              onComplete={() => setStep("verdict")}
            />
          )}

          {/* ─── Verdict ─── */}
          {step === "verdict" && curl && struggle && goal && (
            <VerdictReveal
              verdicts={getVerdicts(curl, struggle, goal)}
              onComplete={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
}

// ─── Reusable question step layout ───

function QuizStep({
  auntyId,
  question,
  prompt,
  onQuestionRevealed,
  children,
}: {
  auntyId: string;
  question: string;
  prompt: string;
  onQuestionRevealed: () => void;
  children: React.ReactNode;
}) {
  const aunty = getAunty(auntyId);

  // Show options immediately
  useEffect(() => {
    const t = setTimeout(onQuestionRevealed, 100);
    return () => clearTimeout(t);
  }, [onQuestionRevealed]);

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      {/* Aunty host */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
        <AuntyAvatar color={aunty.color} size={40} />
        <div>
          <p
            className="font-body text-sm font-semibold"
            style={{ color: aunty.color }}
          >
            {aunty.name}
          </p>
          <p className="font-body text-[10px] text-[rgba(254,248,236,0.4)]">
            {aunty.title} &middot; {aunty.dialect}
          </p>
        </div>
      </div>

      {/* Question */}
      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#FEF8EC] leading-snug mb-2 animate-fade-in-up">
        {question}
      </h3>

      {/* Aunty prompt */}
      <p className="font-display text-base italic text-[rgba(254,248,236,0.5)] mb-8 animate-fade-in-up delay-100">
        &ldquo;{prompt}&rdquo;
      </p>

      {/* Options */}
      {children}
    </div>
  );
}
