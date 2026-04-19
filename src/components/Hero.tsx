"use client";

import InteractivePhone from "./InteractivePhone";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import { aunties } from "@/data/aunties";
import { FOUNDING_SPOTS } from "@/lib/constants";

// ─── Word-by-word blur reveal (CSS-only, no framer-motion) ───
interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number; // ms before first word starts
  stagger?: number; // ms between words
  duration?: number; // ms per word animation
}

function WordReveal({
  text,
  as: Tag = "h1",
  className = "",
  style,
  baseDelay = 0,
  stagger = 75,
  duration = 700,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          <span
            style={{
              display: "inline-block",
              opacity: 0,
              filter: "blur(10px)",
              transform: "translateY(16px)",
              animation: `wordBlurIn ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards`,
              animationDelay: `${baseDelay + i * stagger}ms`,
              willChange: "transform, opacity, filter",
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] lg:h-[100svh] flex items-center overflow-hidden bg-[#FEF8EC] noise pt-16 lg:pt-20">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#D4A04A] opacity-[0.1] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#3D5A99] opacity-[0.06] blur-[100px]" />
      </div>

      {/* Floating aunty orbs */}
      {aunties.map((a, i) => (
        <div
          key={a.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 80 + (i % 3) * 40,
            height: 80 + (i % 3) * 40,
            left: `${8 + i * 13}%`,
            top: `${15 + (i % 4) * 18}%`,
            backgroundColor: a.color,
            opacity: 0.05,
            filter: "blur(50px)",
            animation: `float ${18 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 md:py-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Overline pill */}
            <div
              className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-[rgba(212,160,74,0.25)] bg-[rgba(212,160,74,0.06)]"
              style={{
                opacity: 0,
                animation: "introFade 500ms ease-out forwards",
                animationDelay: "150ms",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[#D4A04A] text-[12px] font-semibold tracking-[3px] uppercase">
                7 AI Hair Advisors
              </p>
            </div>

            {/* Headline — word blur reveal, fully visible in ~700ms */}
            <WordReveal
              text="Hair care that knows your texture"
              as="h1"
              baseDelay={250}
              stagger={75}
              duration={700}
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-shimmer leading-[1.05] mb-3 tracking-[-0.01em]"
            />

            <p
              className="font-body text-sm md:text-base text-[rgba(26,15,8,0.6)] max-w-lg mx-auto lg:mx-0 mb-5 leading-relaxed"
              style={{
                opacity: 0,
                animation: "introFade 600ms ease-out forwards",
                animationDelay: "750ms",
              }}
            >
              Seven aunties. One personalized routine. Real wisdom — just for
              your curls.
            </p>

            {/* Aunty strip — the council at a glance */}
            <div
              className="mb-5"
              style={{
                opacity: 0,
                animation: "introFade 700ms ease-out forwards",
                animationDelay: "950ms",
              }}
            >
              <div className="flex items-start justify-center lg:justify-start gap-3 sm:gap-4">
                {aunties.map((a, i) => (
                  <div
                    key={a.id}
                    className="flex flex-col items-center gap-1.5 group"
                    style={{
                      opacity: 0,
                      animation: "introFade 500ms ease-out forwards",
                      animationDelay: `${1000 + i * 60}ms`,
                    }}
                  >
                    <div
                      className="relative rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
                      style={{
                        boxShadow: `0 2px 10px ${a.color}35`,
                        border: `1.5px solid ${a.color}40`,
                      }}
                      title={`${a.name} · ${a.title}`}
                    >
                      <AuntyCharacterIcon auntyId={a.id} size={40} />
                    </div>
                    <span
                      className="font-body text-[10px] sm:text-[11px] font-medium tracking-wide"
                      style={{ color: a.color }}
                    >
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col items-center lg:items-start gap-2"
              style={{
                opacity: 0,
                animation: "introFade 700ms ease-out forwards",
                animationDelay: "1400ms",
              }}
            >
              {/* CTA row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => scrollTo("pricing")}
                  className="animate-pulse-glow px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-sm md:text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#D4A04A]/30"
                >
                  Become a Founding Member
                </button>

                <button
                  onClick={() => scrollTo("quiz")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(212,160,74,0.3)] bg-[rgba(212,160,74,0.04)] text-[#D4A04A] font-body text-sm font-medium hover:bg-[rgba(212,160,74,0.1)] hover:border-[#D4A04A]/50 transition-all"
                >
                  Try the consultation
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              {/* Social proof + tertiary inline */}
              <p className="font-body text-xs text-[rgba(26,15,8,0.5)] mt-1">
                Only{" "}
                <span className="text-[#D4A04A] font-semibold">
                  {FOUNDING_SPOTS}
                </span>{" "}
                founding spots ·{" "}
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="underline underline-offset-4 decoration-[rgba(26,15,8,0.2)] hover:text-[#D4A04A] transition-colors"
                >
                  notify me at launch
                </button>
              </p>
            </div>
          </div>

          {/* Right: Interactive phone mockup */}
          <div className="flex-shrink-0 flex items-start gap-4 relative">
            <div
              style={{
                opacity: 0,
                animation: "introFade 800ms ease-out forwards",
                animationDelay: "400ms",
              }}
            >
              <div className="scale-[0.65] sm:scale-[0.75] md:scale-[0.82] lg:scale-[0.88] origin-top">
                <InteractivePhone />
              </div>
            </div>
            <div
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(212,160,74,0.25)] bg-[rgba(212,160,74,0.08)] mt-12 whitespace-nowrap"
              style={{
                opacity: 0,
                animation: "introFade 700ms ease-out forwards",
                animationDelay: "800ms",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[11px] text-[#D4A04A] font-medium">
                Interactive
              </p>
            </div>
            <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(212,160,74,0.25)] bg-[#FEF8EC]/90 backdrop-blur whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[9px] text-[#D4A04A] font-medium">
                Tap to explore
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FEF8EC] to-transparent pointer-events-none" />
    </section>
  );
}
