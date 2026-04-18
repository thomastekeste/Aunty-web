"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
}

export function useInView({ threshold = 0.15, once = true }: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  // Default to true if the browser doesn't support IntersectionObserver
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IO support → just show everything
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // Check initial position synchronously — if already past mid-viewport, skip animation
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.85;
    if (alreadyVisible) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return [ref, inView] as const;
}
