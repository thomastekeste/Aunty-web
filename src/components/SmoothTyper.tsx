'use client';

import { useEffect, useRef, useState } from 'react';

interface SmoothTyperProps {
  text: string;
  baseSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  cursor?: boolean;
  enabled?: boolean;
}

function getDelay(char: string, prevChar: string, base: number): number {
  // Sentence-ending punctuation — dramatic breath
  if ('.!?'.includes(char)) return base * 8 + Math.random() * base * 4;
  // Mid-sentence pause
  if (',;:'.includes(char)) return base * 3 + Math.random() * base * 1.5;
  // Space — word boundary hesitation, highly variable
  if (char === ' ') return base * 0.7 + Math.random() * base * 2;
  // First char after space — reaching for the next key
  if (prevChar === ' ' || prevChar === '') return base * 1.3 + Math.random() * base * 0.7;
  // Occasional organic hesitation (~7% of chars)
  if (Math.random() < 0.07) return base * 2.2 + Math.random() * base * 1.8;
  // Normal typing — skewed toward fast bursts
  const r = Math.random();
  if (r < 0.55) return base * 0.55 + Math.random() * base * 0.5;   // fast burst
  if (r < 0.82) return base * 0.9 + Math.random() * base * 0.45;   // normal
  return base * 1.4 + Math.random() * base * 0.9;                  // momentary slow
}

export default function SmoothTyper({
  text,
  baseSpeed = 55,
  startDelay = 0,
  onComplete,
  className = '',
  style,
  as: Tag = 'p',
  cursor = true,
  enabled = true,
}: SmoothTyperProps) {
  const [charCount, setCharCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const firedRef = useRef(false);

  // Respect prefers-reduced-motion — show text instantly if user prefers no motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!enabled) return;

    // Skip animation entirely for users who prefer reduced motion
    if (prefersReducedMotion) {
      setCharCount(text.length);
      setIsComplete(true);
      return;
    }

    let idx = 0;

    const typeNext = () => {
      if (idx < text.length) {
        const prevChar = idx > 0 ? text[idx - 1] : '';
        idx++;
        setCharCount(idx);
        const delay = getDelay(text[idx - 1], prevChar, baseSpeed);
        timeoutRef.current = setTimeout(typeNext, delay);
      } else {
        setIsComplete(true);
      }
    };

    timeoutRef.current = setTimeout(typeNext, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, baseSpeed, startDelay, enabled, prefersReducedMotion]);

  useEffect(() => {
    if (isComplete && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  const chars = Array.from(text);

  return (
    <Tag className={`${className} relative`} style={style}>
      {/* Per-character fade-in for a smoother, cinematic typing feel.
          All chars are always rendered so layout stays rock-stable. */}
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {chars.map((c, i) => {
          const revealed = i < charCount;
          return (
            <span
              key={i}
              aria-hidden={!revealed}
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(4px)',
                filter: revealed ? 'blur(0)' : 'blur(6px)',
                transition: prefersReducedMotion
                  ? 'none'
                  : 'opacity 260ms ease-out, transform 260ms ease-out, filter 260ms ease-out',
              }}
            >
              {c}
            </span>
          );
        })}
      </span>

      {/* Cursor */}
      {cursor && !isComplete && (
        <span
          className="inline-block align-baseline"
          style={{
            width: '2px',
            height: '0.85em',
            verticalAlign: '-0.1em',
            marginLeft: '2px',
            backgroundColor: '#D4A04A',
            borderRadius: '1px',
            boxShadow: '0 0 10px #D4A04A, 0 0 22px rgba(212,160,74,0.45)',
            animation: prefersReducedMotion ? 'none' : 'blink 1s step-end infinite',
          }}
        />
      )}
    </Tag>
  );
}
