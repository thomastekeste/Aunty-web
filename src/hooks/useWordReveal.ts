"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseWordRevealOptions {
  text: string;
  stagger?: number;
  startDelay?: number;
  enabled?: boolean;
}

export function useWordReveal({
  text,
  stagger = 85,
  startDelay = 0,
  enabled = true,
}: UseWordRevealOptions) {
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisibleCount(0);
    setIsComplete(false);
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    if (!enabled) {
      reset();
      return;
    }

    const revealNext = () => {
      indexRef.current += 1;
      setVisibleCount(indexRef.current);

      if (indexRef.current < words.length) {
        timerRef.current = setTimeout(revealNext, stagger);
      } else {
        setIsComplete(true);
      }
    };

    timerRef.current = setTimeout(revealNext, startDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, stagger, startDelay, enabled, words.length, reset]);

  return {
    visibleText: words.slice(0, visibleCount).join(" "),
    isComplete,
    visibleCount,
    totalWords: words.length,
    reset,
  };
}
