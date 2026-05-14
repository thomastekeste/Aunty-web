"use client";

import type { Aunty } from "@/data/aunties";
import AuntyPortrait from "./AuntyPortrait";

interface AuntySpeechBubbleProps {
  aunty: Aunty;
  onContinue: () => void;
}

export default function AuntySpeechBubble({
  aunty,
  onContinue,
}: AuntySpeechBubbleProps) {
  return (
    <div
      className="relative max-w-[560px] mx-auto rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-[0_20px_50px_-12px_rgba(26,15,8,0.18)]"
      style={{
        background: `linear-gradient(135deg, ${aunty.gradient[0]} 0%, ${aunty.gradient[1]} 100%)`,
        border: `2px solid ${aunty.color}`,
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45"
        style={{
          background: aunty.gradient[0],
          borderLeft: `2px solid ${aunty.color}`,
          borderTop: `2px solid ${aunty.color}`,
        }}
        aria-hidden="true"
      />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AuntyPortrait auntyId={aunty.id} size={64} bg={aunty.bg} />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-body text-[10px] font-bold tracking-[1.5px] uppercase mb-1"
            style={{ color: aunty.color }}
          >
            Aunty {aunty.name}
          </p>
          <p className="font-display text-[18px] md:text-[20px] leading-snug text-[#1A0F08] mb-1.5">
            {aunty.greeting}
          </p>
          <p className="font-body text-[14px] leading-relaxed text-[#1A0F08]/75">
            I&apos;ll be right here when you&apos;re ready for your consultation.
          </p>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-5 w-full py-3.5 rounded-full font-body text-[12px] font-bold tracking-[1.5px] uppercase text-white transition-all hover:opacity-90 hover:scale-[1.01]"
        style={{ backgroundColor: aunty.color }}
      >
        Continue to the site →
      </button>
    </div>
  );
}
