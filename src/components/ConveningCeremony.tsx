"use client";

import { useState, useEffect } from "react";
import { aunties } from "@/data/aunties";
import {
  type CurlType,
  type Struggle,
  type Goal,
} from "@/data/quiz";

interface Props {
  curl: CurlType;
  struggle: Struggle;
  goal: Goal;
  onComplete: () => void;
}

export default function ConveningCeremony({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  // Animate progress bar over 3s
  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 100);
    return () => clearTimeout(t);
  }, []);

  // Complete after 3s
  useEffect(() => {
    const t = setTimeout(onComplete, 3200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 text-center">
      <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-8">
        Your Aunties Are Reviewing
      </p>

      {/* Aunty dots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {aunties.map((aunty, i) => (
          <div
            key={aunty.id}
            className="w-8 h-8 rounded-full animate-pulse"
            style={{
              backgroundColor: aunty.color,
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-[rgba(254,248,236,0.06)] rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #D4A04A, #B8862E)",
            transition: "width 3s ease-out",
          }}
        />
      </div>

      <p className="font-body text-sm text-[rgba(254,248,236,0.4)]">
        Building your personalized plan...
      </p>
    </div>
  );
}
