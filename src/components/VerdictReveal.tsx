"use client";

import { useState, useEffect } from "react";
import AuntyAvatar from "./AuntyAvatar";
import { getAunty } from "@/data/aunties";
import type { TeaserVerdict } from "@/data/quiz";

interface Props {
  verdicts: TeaserVerdict[];
  onComplete: () => void;
}

export default function VerdictReveal({ verdicts, onComplete }: Props) {
  const [visible, setVisible] = useState(0);

  // Stagger card appearances
  useEffect(() => {
    const timers = verdicts.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 300 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [verdicts]);

  return (
    <div className="flex flex-col items-center min-h-full px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-3">
          Your Results
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1A0F08]">
          Here&rsquo;s what your aunties think
        </h3>
      </div>

      {/* Verdict cards — all at once with stagger */}
      <div className="w-full max-w-lg space-y-4 mb-8">
        {verdicts.map((v, i) => {
          const aunty = getAunty(v.auntyId);
          return (
            <div
              key={v.auntyId}
              className="rounded-xl p-5 transition-all duration-500"
              style={{
                backgroundColor: `${aunty.color}10`,
                border: `1px solid ${aunty.color}25`,
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <AuntyAvatar color={aunty.color} size={36} />
                <div>
                  <p className="font-body text-sm font-semibold" style={{ color: aunty.color }}>
                    {aunty.name}
                  </p>
                  <p className="font-body text-[10px] text-[rgba(26,15,8,0.4)]">
                    {aunty.title}
                  </p>
                </div>
              </div>
              <p className="font-display text-base italic text-[#1A0F08] leading-relaxed">
                &ldquo;{v.message}&rdquo;
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="w-full max-w-lg transition-all duration-500"
        style={{
          opacity: visible >= verdicts.length ? 1 : 0,
          transform: visible >= verdicts.length ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div className="rounded-2xl bg-[rgba(212,160,74,0.08)] border border-[rgba(212,160,74,0.2)] p-6 text-center">
          <p className="font-display text-xl font-bold text-[#1A0F08] mb-2">
            Your full plan is ready.
          </p>
          <p className="font-body text-sm text-[rgba(26,15,8,0.5)] mb-5">
            Get early access to your personalized hair care plan.
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
