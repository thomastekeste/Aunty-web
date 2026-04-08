"use client";

import { useState, useEffect, useCallback } from "react";
import AuntyAvatar from "./AuntyAvatar";
import WordReveal from "./WordReveal";
import { getAunty } from "@/data/aunties";
import type { TeaserVerdict } from "@/data/quiz";

interface Props {
  verdicts: TeaserVerdict[];
  onComplete: () => void;
}

export default function VerdictReveal({ verdicts, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = intro
  const [showAvatar, setShowAvatar] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // Start first verdict after intro delay
  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentIndex(0);
      setShowAvatar(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const handleVerdictComplete = useCallback(() => {
    const next = currentIndex + 1;
    if (next < verdicts.length) {
      // 900ms hold, then crossfade to next aunty
      setTimeout(() => {
        setShowAvatar(false);
        setTimeout(() => {
          setCurrentIndex(next);
          setShowAvatar(true);
        }, 400);
      }, 900);
    } else {
      // All done — show CTA after 700ms
      setTimeout(() => setShowCta(true), 700);
    }
  }, [currentIndex, verdicts.length]);

  const currentVerdict = currentIndex >= 0 ? verdicts[currentIndex] : null;
  const currentAunty = currentVerdict ? getAunty(currentVerdict.auntyId) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6">
      {/* Title */}
      {currentIndex === -1 && (
        <div className="text-center animate-fade-in-up">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            The Verdict
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#FEF8EC]">
            Your Aunties Have Spoken
          </h3>
        </div>
      )}

      {/* Progress dots */}
      {currentIndex >= 0 && (
        <div className="flex items-center gap-2 mb-10">
          {verdicts.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === currentIndex ? 24 : 8,
                height: 8,
                backgroundColor:
                  i === currentIndex
                    ? getAunty(verdicts[i].auntyId).color
                    : i < currentIndex
                      ? "rgba(254,248,236,0.3)"
                      : "rgba(254,248,236,0.1)",
              }}
            />
          ))}
        </div>
      )}

      {/* Current aunty verdict */}
      {currentAunty && currentVerdict && (
        <div
          className="max-w-lg text-center transition-all duration-400"
          style={{
            opacity: showAvatar ? 1 : 0,
            transform: showAvatar ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="flex justify-center mb-4">
            <AuntyAvatar color={currentAunty.color} size={64} glow />
          </div>
          <p
            className="font-body text-sm font-semibold mb-1"
            style={{ color: currentAunty.color }}
          >
            {currentAunty.name}
          </p>
          <p className="font-body text-[10px] text-[rgba(254,248,236,0.4)] mb-6">
            {currentAunty.title} &middot; {currentAunty.region}
          </p>

          <WordReveal
            key={currentVerdict.auntyId}
            text={currentVerdict.message}
            as="p"
            stagger={85}
            startDelay={400}
            onComplete={handleVerdictComplete}
            className="font-display text-xl md:text-2xl italic text-[#FEF8EC] leading-relaxed"
            cursor
          />
        </div>
      )}

      {/* CTA */}
      {showCta && (
        <div className="mt-12 w-full max-w-md animate-fade-in-up">
          <div className="rounded-2xl bg-[rgba(212,160,74,0.08)] border border-[rgba(212,160,74,0.2)] p-8 text-center">
            <p className="font-display text-2xl font-bold text-[#FEF8EC] mb-2">
              Your full ritual is ready.
            </p>
            <p className="font-body text-[rgba(254,248,236,0.6)] mb-6">
              Your aunties have a complete personalized hair care plan waiting for you.
            </p>
            <a
              href="#waitlist"
              onClick={() => {
                onComplete();
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-semibold hover:bg-[#B8862E] transition-colors animate-pulse-glow"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
