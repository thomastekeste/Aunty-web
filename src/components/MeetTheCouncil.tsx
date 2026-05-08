"use client";

import { useState } from "react";
import { aunties } from "@/data/aunties";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import WordReveal from "./WordReveal";

function AuntyCard({ aunty }: { aunty: (typeof aunties)[0] }) {
  const [active, setActive] = useState(false);

  return (
    <div className="flex-shrink-0 w-[260px] md:w-auto">
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => setActive(!active)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(!active); } }}
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`${aunty.name} — ${aunty.title}. Press to hear her greeting.`}
        className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
        style={{
          background: active ? aunty.color + "08" : "#F7F5F0",
          border: `1px solid ${active ? aunty.color + "25" : "rgba(26,15,8,0.06)"}`,
        }}
      >
        <div className="p-6">
          {/* Avatar + name */}
          <div className="flex items-center gap-4 mb-4">
            <AuntyCharacterIcon auntyId={aunty.id} color={aunty.color} size={48} glow={false} />
            <div>
              <h3 className="font-display text-base font-bold text-[#2D1B0E]">
                {aunty.name}
              </h3>
              <p className="font-body text-[11px] font-semibold tracking-[1px] uppercase text-[#9E8C7A]">
                {aunty.title}
              </p>
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-body text-[11px] text-[#9E8C7A]">{aunty.region}</span>
            <span className="text-[#E8DCC8]">&middot;</span>
            <span className="font-body text-[11px] text-[#9E8C7A]">{aunty.dialect}</span>
          </div>

          {/* Specialty */}
          <p className="font-body text-[13px] text-[#6B5040] leading-relaxed mb-4">
            {aunty.specialty}
          </p>

          {/* Greeting — on hover/click */}
          <div className="min-h-[24px]">
            {active ? (
              <div style={{ color: aunty.color }}>
                <WordReveal
                  text={aunty.greeting}
                  as="p"
                  stagger={65}
                  className="font-body text-[13px] font-semibold italic"
                  cursor
                />
              </div>
            ) : (
              <p className="font-body text-[11px] text-[#9E8C7A]">
                Click to hear from {aunty.name}&hellip;
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetTheCouncil() {
  const [showAll, setShowAll] = useState(false);
  const visibleAunties = showAll ? aunties : aunties.slice(0, 4);

  return (
    <section id="council" className="py-16 md:py-24 bg-[#FDFCF8]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-3">
            Your Aunties
          </p>
          <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-3">
            Seven aunties. Seven perspectives.
          </h2>
          <p className="font-body text-[15px] text-[#6B5040] max-w-xl leading-[1.7]">
            Seven aunties that know the texture of your hair. Nigerian Pidgin to Jamaican Patois.
            Shea butter to argan oil. Together, they see the full picture.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-8 px-8 snap-x snap-mandatory">
          {aunties.map((aunty) => (
            <div key={aunty.id} className="snap-start">
              <AuntyCard aunty={aunty} />
            </div>
          ))}
          <div className="flex-shrink-0 w-8" />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleAunties.map((aunty) => (
            <AuntyCard key={aunty.id} aunty={aunty} />
          ))}
        </div>

        {/* Show all toggle */}
        {!showAll && (
          <div className="hidden md:flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="font-body text-[12px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 hover:opacity-60 transition-opacity"
            >
              Meet all 7 aunties
            </button>
          </div>
        )}

        {/* Funnel CTA */}
        <div className="flex flex-col items-center text-center mt-14 pt-10 border-t border-[rgba(26,15,8,0.06)]">
          <p className="font-body text-[15px] text-[#6B5040] mb-5 max-w-md leading-[1.7]">
            Take the consultation and see which aunties pick for you.
          </p>
          <a
            href="#quiz"
            className="px-8 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors"
          >
            Start Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
