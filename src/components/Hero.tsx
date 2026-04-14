"use client";

import { useState } from "react";
import WordReveal from "./WordReveal";
import SmoothTyper from "./SmoothTyper";
import InteractivePhone from "./InteractivePhone";
import { aunties } from "@/data/aunties";

export default function Hero() {
  const [overlineDone, setOverlineDone] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A0F08] noise pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#D4A04A] opacity-[0.04] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.03] blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#3D5A99] opacity-[0.03] blur-[100px]" />
      </div>

      {/* Floating aunty orbs — subtle background */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <WordReveal
              text="Personalized Hair Care"
              as="p"
              stagger={100}
              startDelay={300}
              onComplete={() => setOverlineDone(true)}
              className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-6"
            />

            {overlineDone && (
              <div className="mb-6">
                <SmoothTyper
                  text="Your Aunties Have Been Waiting"
                  as="h1"
                  baseSpeed={62}
                  onComplete={() => setHeadlineDone(true)}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-shimmer leading-[1.05]"
                  cursor
                />
              </div>
            )}

            {headlineDone && (
              <WordReveal
                text="Seven aunties that know the texture of your hair. Real wisdom, not algorithms. A personalized ritual — just for your curls."
                as="p"
                stagger={60}
                startDelay={200}
                onComplete={() => setSubtitleDone(true)}
                className="font-body text-lg md:text-xl text-[rgba(254,248,236,0.55)] max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              />
            )}

            {subtitleDone && (
              <div className="animate-fade-in-up flex flex-col items-center lg:items-start gap-3">
                <button
                  onClick={() => scrollTo("quiz")}
                  className="animate-pulse-glow px-10 py-4 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#D4A04A]/20"
                >
                  Take the Free Consultation
                </button>
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#FEF8EC] transition-colors"
                >
                  or skip to waitlist &darr;
                </button>
              </div>
            )}

            {/* Social proof teaser */}
            {subtitleDone && (
              <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up delay-300">
                <div className="flex -space-x-2">
                  {aunties.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      className="w-7 h-7 rounded-full border-2 border-[#1A0F08]"
                      style={{ backgroundColor: a.color + "40" }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: a.color + "30" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: a.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-body text-sm text-[rgba(254,248,236,0.4)]">
                  <span className="text-[#D4A04A] font-semibold">2,400+</span> on the waitlist
                </p>
              </div>
            )}
          </div>

          {/* Right: Interactive phone mockup */}
          <div className="flex-shrink-0 flex items-start gap-4 relative">
            <div
              className="scale-[0.75] md:scale-100 origin-top"
              style={{ animation: "phonePulse 6s ease-in-out infinite" }}
            >
              <InteractivePhone />
            </div>
            {/* Badge to the right of the phone */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(212,160,74,0.25)] bg-[rgba(212,160,74,0.08)] mt-16 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A04A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A04A]" />
              </span>
              <p className="font-body text-[11px] text-[#D4A04A] font-medium">
                Interactive
              </p>
            </div>
            {/* Mobile: small interactive badge below */}
            <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(212,160,74,0.25)] bg-[#1A0F08]/90 backdrop-blur whitespace-nowrap">
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

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEF8EC] to-transparent" />
    </section>
  );
}
