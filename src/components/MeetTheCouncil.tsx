"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { aunties } from "@/data/aunties";
import AuntyAvatar from "./AuntyAvatar";
import WordReveal from "./WordReveal";

function AuntyCard({
  aunty,
  index,
  inView,
}: {
  aunty: (typeof aunties)[0];
  index: number;
  inView: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[280px] md:w-auto"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.6s ease-out ${index * 80}ms`,
      }}
    >
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => setActive(!active)}
        className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 bg-white"
        style={{
          boxShadow: active
            ? `0 12px 48px ${aunty.color}30, 0 0 0 1.5px ${aunty.color}55`
            : `0 6px 24px rgba(45,27,14,0.08), 0 0 0 1px rgba(26,15,8,0.08)`,
        }}
      >
        {/* Top accent band */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${aunty.color}, ${aunty.color}60)` }}
        />

        <div className="p-5 bg-white">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            <AuntyAvatar color={aunty.color} size={44} glow={active} />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-bold text-[#2D1B0E]">
                {aunty.name}
              </h3>
              <p className="font-body text-xs font-semibold" style={{ color: aunty.color }}>
                {aunty.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-body text-[10px] text-[#9E8C7A]">{aunty.region}</span>
                <span className="text-[#E8DCC8]">&middot;</span>
                <span className="font-body text-[10px] text-[#9E8C7A]">{aunty.dialect}</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div
            className="rounded-xl p-3 mb-3"
            style={{
              backgroundColor: aunty.color + "08",
              borderLeft: `3px solid ${aunty.color}40`,
            }}
          >
            <p className="font-display text-sm italic text-[#5C4433] leading-relaxed">
              &ldquo;{aunty.quote}&rdquo;
            </p>
          </div>

          {/* Specialty */}
          <p className="font-body text-xs text-[#9E8C7A] leading-relaxed mb-3">
            {aunty.specialty}
          </p>

          {/* Greeting — word-by-word on hover */}
          <div className="min-h-[28px] border-t border-[rgba(45,27,14,0.06)] pt-2.5">
            {active ? (
              <div style={{ color: aunty.color }}>
                <WordReveal
                  text={aunty.greeting}
                  as="p"
                  stagger={65}
                  className="font-body text-sm font-semibold"
                  cursor
                />
              </div>
            ) : (
              <p className="font-body text-xs text-[#9E8C7A] italic">
                Hover to hear from {aunty.name}&hellip;
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetTheCouncil() {
  const [ref, inView] = useInView({ threshold: 0.08 });
  const [showAll, setShowAll] = useState(false);

  const visibleAunties = showAll ? aunties : aunties.slice(0, 4);

  return (
    <section id="council" className="py-16 md:py-24 bg-[#FEF8EC]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Your Aunties
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2D1B0E] mb-4">
            Seven Aunties. Seven Perspectives.
          </h2>
          <p className="font-body text-lg text-[#5C4433] max-w-2xl mx-auto">
            Seven aunties that know the texture of your hair. Nigerian Pidgin to Jamaican Patois.
            Shea butter to argan oil. Together, they see the full picture.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {aunties.map((aunty, i) => (
            <div key={aunty.id} className="snap-start">
              <AuntyCard aunty={aunty} index={i} inView={inView} />
            </div>
          ))}
          {/* Spacer so last card isn't flush to edge */}
          <div className="flex-shrink-0 w-6" />
        </div>
        {/* Scroll hint — mobile only */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
          {aunties.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[rgba(26,15,8,0.15)]" />
          ))}
        </div>

        {/* Desktop: grid with expand */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleAunties.map((aunty, i) => (
            <AuntyCard key={aunty.id} aunty={aunty} index={i} inView={inView} />
          ))}
        </div>

        {/* Show all toggle — desktop */}
        {!showAll && (
          <div className="hidden md:flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="font-body text-sm font-semibold text-[#D4A04A] hover:text-[#B8862E] transition-colors flex items-center gap-2"
            >
              Meet all 7 aunties
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
