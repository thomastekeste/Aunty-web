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

  useEffect(() => {
    if (!enabled) return;

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
  }, [text, baseSpeed, startDelay, enabled]);

  useEffect(() => {
    if (isComplete && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  const visibleText = text.substring(0, charCount);

  return (
    <Tag className={`${className} relative`} style={style}>
      {/* Visible text */}
      <span>{visibleText}</span>

      {/* Cursor */}
      {cursor && !isComplete && (
        <span
          className="inline-block"
          style={{
            width: '2px',
            height: '0.85em',
            verticalAlign: '-0.1em',
            marginLeft: '1px',
            backgroundColor: '#D4A04A',
            boxShadow: '0 0 8px #D4A04A, 0 0 16px rgba(212,160,74,0.4)',
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}

      {/* Ghost text for layout stability */}
      <span className="invisible select-none" aria-hidden="true">
        {text.substring(charCount)}
      </span>
    </Tag>
  );
}
