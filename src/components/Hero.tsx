"use client";

import InteractivePhone from "./InteractivePhone";
import { aunties } from "@/data/aunties";
import SmoothTyper from "./SmoothTyper";
import { FOUNDING_SPOTS } from "@/lib/constants";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FEF8EC] noise pt-20">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.08] blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#3D5A99] opacity-[0.08] blur-[100px]" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6 md:py-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-3">
              Personalized Hair Care
            </p>

            <SmoothTyper
              text="Your Aunties Have Been Waiting"
              as="h1"
              baseSpeed={62}
              startDelay={300}
              cursor
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-shimmer leading-[1.05] mb-3"
            />

            <p className="font-body text-base md:text-lg text-[rgba(26,15,8,0.55)] max-w-lg mx-auto lg:mx-0 mb-5 leading-relaxed">
              Seven aunties that know the texture of your hair. Real wisdom — just for your curls.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3">
                {/* Primary CTA — pre-order / founding member */}
                <button
                  onClick={() => scrollTo("pricing")}
                  className="animate-pulse-glow px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#D4A04A]/30"
                >
                  Become a Founding Member
                </button>

                {/* Secondary — consultation */}
                <button
                  onClick={() => scrollTo("quiz")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(212,160,74,0.3)] bg-[rgba(212,160,74,0.04)] text-[#D4A04A] font-body text-sm font-medium hover:bg-[rgba(212,160,74,0.1)] hover:border-[#D4A04A]/50 transition-all"
                >
                  Try the consultation first
                  <span aria-hidden="true">→</span>
                </button>

                {/* Tertiary — just notify me */}
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="font-body text-xs text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors underline underline-offset-4 decoration-[rgba(26,15,8,0.15)]"
                >
                  Just want to be notified when it launches? →
                </button>

                {/* Social proof */}
                <div className="flex items-center gap-3 justify-center lg:justify-start mt-1">
                  <div className="flex -space-x-2">
                    {aunties.slice(0, 4).map((a) => (
                      <div
                        key={a.id}
                        className="w-6 h-6 rounded-full border-2 border-[#FEF8EC]"
                        style={{ backgroundColor: a.color + "40" }}
                      >
                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: a.color + "30" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-xs text-[rgba(26,15,8,0.4)]">
                    Only <span className="text-[#D4A04A] font-semibold">{FOUNDING_SPOTS}</span> founding spots available
                  </p>
                </div>
              </div>
          </div>

          {/* Right: Interactive phone mockup */}
          <div className="flex-shrink-0 flex items-start gap-4 relative">
            <div style={{ animation: "phonePulse 6s ease-in-out infinite" }}>
              <div className="scale-[0.7] md:scale-[0.8] lg:scale-[0.85] origin-top">
                <InteractivePhone />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(212,160,74,0.25)] bg-[rgba(212,160,74,0.08)] mt-12 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[11px] text-[#D4A04A] font-medium">Interactive</p>
            </div>
            <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(212,160,74,0.25)] bg-[#FEF8EC]/90 backdrop-blur whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[9px] text-[#D4A04A] font-medium">Tap to explore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEF8EC] to-transparent pointer-events-none" />
    </section>
  );
}
