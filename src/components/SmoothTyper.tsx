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

function getDelay(char: string, base: number): number {
  if ('.!?'.includes(char)) return base * 10;
  if (',;:'.includes(char)) return base * 4;
  return base + Math.round((Math.random() - 0.5) * 30);
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
        idx++;
        setCharCount(idx);
        const delay = getDelay(text[idx - 1], baseSpeed);
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
