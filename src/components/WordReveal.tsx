"use client";

import { useEffect, useRef } from "react";
import { useWordReveal } from "@/hooks/useWordReveal";

interface WordRevealProps {
  text: string;
  stagger?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  cursor?: boolean;
  enabled?: boolean;
}

export default function WordReveal({
  text,
  stagger = 85,
  startDelay = 0,
  onComplete,
  className = "",
  as: Tag = "p",
  cursor = false,
  enabled = true,
}: WordRevealProps) {
  const { visibleText, isComplete } = useWordReveal({
    text,
    stagger,
    startDelay,
    enabled,
  });

  const firedRef = useRef(false);

  useEffect(() => {
    if (isComplete && onComplete && !firedRef.current) {
      firedRef.current = true;
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <Tag className={`relative ${className}`}>
      {visibleText}
      {cursor && !isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-[#D4A04A] ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
      )}
      {/* Invisible full text reserves layout space */}
      <span className="invisible select-none" aria-hidden="true">
        {" "}{text}
      </span>
    </Tag>
  );
}
