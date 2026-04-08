"use client";

import { useState, useEffect, useCallback } from "react";
import AuntyAvatar from "./AuntyAvatar";
import WordReveal from "./WordReveal";
import { getAunty } from "@/data/aunties";

interface Props {
  auntyId: string;
  lines: string[];
  onComplete: () => void;
}

export default function QuizValidation({ auntyId, lines, onComplete }: Props) {
  const aunty = getAunty(auntyId);
  const [phase, setPhase] = useState(0); // 0 = avatar enter, 1 = line 1, 2 = line 2, 3 = done
  const [showAvatar, setShowAvatar] = useState(false);

  // Phase 0: show avatar after 200ms
  useEffect(() => {
    const t = setTimeout(() => {
      setShowAvatar(true);
      setPhase(1);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const handleLine1Complete = useCallback(() => {
    if (lines.length > 1) {
      // 900ms hold before line 2
      setTimeout(() => setPhase(2), 900);
    } else {
      // Single line — hold then complete
      setTimeout(onComplete, 1500);
    }
  }, [lines.length, onComplete]);

  const handleLine2Complete = useCallback(() => {
    setTimeout(onComplete, 1500);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 text-center">
      {/* Avatar */}
      <div
        className="mb-8 transition-all duration-500"
        style={{
          opacity: showAvatar ? 1 : 0,
          transform: showAvatar ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
        }}
      >
        <AuntyAvatar color={aunty.color} size={72} glow />
      </div>

      {/* Line 1 */}
      {phase >= 1 && (
        <WordReveal
          text={lines[0]}
          as="h2"
          stagger={85}
          onComplete={handleLine1Complete}
          className="font-display text-2xl md:text-3xl font-bold text-[#FEF8EC] leading-snug max-w-md"
          cursor
        />
      )}

      {/* Line 2 */}
      {phase >= 2 && lines[1] && (
        <div className="mt-4" style={{ color: aunty.color }}>
          <WordReveal
            text={lines[1]}
            as="p"
            stagger={85}
            startDelay={200}
            onComplete={handleLine2Complete}
            className="font-display text-xl md:text-2xl italic max-w-md"
            cursor
          />
        </div>
      )}
    </div>
  );
}
