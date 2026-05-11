"use client";

import ScrollReveal from "./ScrollReveal";
import AuntyCharacterIcon from "./AuntyCharacterIcon";

/* ─── Decorative card visuals ────────────────────────────────────────────── */

function ChaosCard() {
  // Random product silhouettes scattered, muted
  return (
    <div className="absolute inset-0 p-7 overflow-hidden">
      <div className="absolute top-6 left-7 w-12 h-16 rounded-lg bg-[#9E8C7A]/35 rotate-[-12deg]" />
      <div className="absolute top-10 left-24 w-10 h-14 rounded-lg bg-[#9E8C7A]/30 rotate-[8deg]" />
      <div className="absolute top-20 right-8 w-14 h-18 rounded-lg bg-[#9E8C7A]/25 rotate-[15deg]" />
      <div className="absolute top-32 left-12 w-12 h-16 rounded-lg bg-[#9E8C7A]/30 rotate-[-5deg]" />
      <div className="absolute top-40 right-14 w-10 h-14 rounded-lg bg-[#9E8C7A]/35 rotate-[20deg]" />
      <div className="absolute bottom-16 left-8 w-13 h-17 rounded-lg bg-[#9E8C7A]/25 rotate-[-18deg]" />
      <div className="absolute bottom-10 right-6 w-11 h-15 rounded-lg bg-[#9E8C7A]/30 rotate-[10deg]" />
      <div className="absolute bottom-20 left-1/2 w-12 h-16 rounded-lg bg-[#9E8C7A]/40 rotate-[-3deg]" />
      {/* Question marks */}
      <div className="absolute top-1/3 right-1/3 text-[#9E8C7A]/25 font-display text-3xl">?</div>
      <div className="absolute bottom-1/3 left-1/3 text-[#9E8C7A]/25 font-display text-2xl">?</div>
    </div>
  );
}

function QuizUICard() {
  return (
    <div className="absolute inset-0 p-6 flex flex-col gap-3.5">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-[#1A0F08]/8 overflow-hidden">
          <div className="h-full w-[60%] bg-gradient-to-r from-[#C9903A] to-[#E8C87A] rounded-full" />
        </div>
        <span className="font-body text-[9px] font-bold tracking-[1.5px] uppercase text-[#9E8C7A]">
          4/7
        </span>
      </div>

      {/* Aunty avatar + question */}
      <div className="flex items-start gap-2.5 mt-2">
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <AuntyCharacterIcon auntyId="ngozi" size={36} />
        </div>
        <div className="flex-1 bg-[#FDFCF8] rounded-2xl rounded-tl-md p-3 shadow-sm">
          <p className="font-display text-[11px] font-bold text-[#2D1B0E] leading-snug">
            What&apos;s your hair&apos;s curl pattern?
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        {["3B", "3C", "4A", "4B"].map((t, i) => (
          <div
            key={t}
            className={`py-2.5 rounded-xl flex items-center justify-center font-display text-[13px] font-bold transition-all ${
              i === 2
                ? "bg-[#1A0F08] text-[#C9903A] ring-2 ring-[#C9903A]"
                : "bg-[#FDFCF8] text-[#2D1B0E] border border-[rgba(26,15,8,0.08)]"
            }`}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Continue button (visual mockup, not interactive) */}
      <div
        aria-hidden
        className="mt-auto w-full py-2.5 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body text-[10px] font-bold tracking-[1.5px] uppercase text-center"
      >
        Continue
      </div>
    </div>
  );
}

function RoutineCard() {
  const items = [
    { name: "Strengthening Shampoo", aunty: "ngozi", price: 22 },
    { name: "Deep Conditioner",      aunty: "marcia", price: 26 },
    { name: "Edge Repair Serum",     aunty: "denise", price: 28 },
  ];
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-body text-[9px] font-bold tracking-[2px] uppercase text-[#1A0F08]">
          Your routine
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A6B3A]/15">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1A6B3A" strokeWidth="3" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="font-body text-[8px] font-bold tracking-[1px] uppercase text-[#1A6B3A]">
            Built
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {items.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2 p-2 rounded-xl bg-[#FDFCF8]/90 border border-[#1A0F08]/5 backdrop-blur-sm"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <AuntyCharacterIcon auntyId={p.aunty} size={28} />
            </div>
            <p className="flex-1 min-w-0 font-display text-[10px] font-bold text-[#1A0F08] truncate">
              {p.name}
            </p>
            <span className="font-body text-[10px] font-semibold text-[#1A0F08]">
              ${p.price}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#1A0F08]/8 flex items-center justify-between">
        <span className="font-display text-[14px] font-bold text-[#1A0F08]">$74<span className="font-body text-[9px] font-normal text-[#5C3F12] ml-0.5">/mo</span></span>
        <span className="font-body text-[8px] font-bold tracking-[1px] uppercase text-[#1A6B3A]">Save 15%</span>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

interface Stage {
  step: string;
  title: string;
  body: string;
  bg: string;
  cardBg: string;
  badge: string;
  badgeColor: string;
  Visual: React.ComponentType;
}

const STAGES: Stage[] = [
  {
    step: "Before",
    title: "The guessing game",
    body: "A bathroom shelf full of products that don't know your texture. Trial, error, and a lot of wasted money.",
    bg: "#EDE9DF",
    cardBg: "#F7F5F0",
    badge: "$240+ wasted",
    badgeColor: "#9E8C7A",
    Visual: ChaosCard,
  },
  {
    step: "The shift",
    title: "Two minutes with aunty",
    body: "Seven aunties. One AI-powered consultation. They listen, ask the right questions, and actually understand what your hair needs.",
    bg: "#F5ECD4",
    cardBg: "#FDFCF8",
    badge: "2 min · Free",
    badgeColor: "#C9903A",
    Visual: QuizUICard,
  },
  {
    step: "After",
    title: "Your actual routine",
    body: "A hand-picked stack with each product matched to your texture, porosity, and goals. Bundled and ready to ship.",
    bg: "#1A0F08",
    cardBg: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 100%)",
    badge: "Save 15% · Ships",
    badgeColor: "#1A6B3A",
    Visual: RoutineCard,
  },
];

export default function TransformSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#FDFCF8] overflow-hidden">
      {/* Subtle backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#1A0F08 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-14 md:mb-20">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              The Aunty effect
            </p>
            <h2 className="font-display text-[2.2rem] md:text-[3.4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em]">
              Before the aunties.
              <br />
              <span className="italic font-light text-[#6B5040]">After the aunties.</span>
            </h2>
            <p className="font-body text-[15px] md:text-base text-[#3D2B1A] leading-[1.7] mt-6 max-w-xl">
              No before-and-after photos. Just the truth about what changes when somebody
              who actually knows your texture is in your corner.
            </p>
          </div>
        </ScrollReveal>

        {/* Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {STAGES.map((stage, i) => {
            const isDark = stage.bg === "#1A0F08";
            return (
              <ScrollReveal key={stage.step} delay={i * 120}>
                <article
                  className="group relative h-full flex flex-col rounded-3xl p-7 overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                  style={{ background: stage.bg }}
                >
                  {/* Step indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-body text-[10px] font-bold tracking-[2.5px] uppercase"
                      style={{ color: isDark ? "#C9903A" : "#9E8C7A" }}
                    >
                      Stage {String(i + 1).padStart(2, "0")} · {stage.step}
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[1.2px] uppercase"
                      style={{
                        background: isDark ? "rgba(201,144,58,0.15)" : `${stage.badgeColor}1A`,
                        color: stage.badgeColor,
                      }}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  {/* Visual placeholder card */}
                  <div
                    className="relative h-[280px] rounded-2xl overflow-hidden mb-5 shadow-[0_12px_40px_-12px_rgba(26,15,8,0.18)] transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ background: stage.cardBg }}
                  >
                    <stage.Visual />
                  </div>

                  {/* Title + body */}
                  <h3
                    className="font-display text-[1.5rem] md:text-[1.7rem] font-bold leading-[1.1] tracking-[-0.02em] mb-3"
                    style={{ color: isDark ? "#FDFCF8" : "#1A0F08" }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.6]"
                    style={{ color: isDark ? "#9E8C7A" : "#3D2B1A" }}
                  >
                    {stage.body}
                  </p>

                  {/* Decorative corner */}
                  <div
                    className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-30 blur-2xl pointer-events-none"
                    style={{
                      background: isDark
                        ? "radial-gradient(circle, #C9903A 0%, transparent 70%)"
                        : "radial-gradient(circle, #FDFCF8 0%, transparent 70%)",
                    }}
                    aria-hidden
                  />
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col items-center text-center mt-16 md:mt-20 pt-10 border-t border-[rgba(26,15,8,0.08)]">
            <p className="font-display text-[1.1rem] md:text-[1.3rem] text-[#1A0F08] mb-5 max-w-md leading-snug">
              You already know which side of this you want to be on.
            </p>
            <a
              href="#quiz"
              className="cta-magnetic group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1.5px] uppercase hover:bg-[#0F0905] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.45)]"
            >
              Skip the guessing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
