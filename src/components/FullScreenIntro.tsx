'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface FullScreenIntroProps {
  onComplete?: () => void;
}

type Phase = 'entering' | 'showing' | 'exiting' | 'done';

const LINE_1 = 'Before YouTube. Before TikTok.';
const LINE_2 = 'There were the aunties.';

const ENTER_MS = 200;
const EYEBROW_DELAY = 250;
const LINE1_DELAY = 700;
const LINE2_DELAY = 1700;
const HOLD_AFTER_LINE2 = 1700;
const EXIT_MS = 700;

interface RevealLineProps {
  text: string;
  delay: number;
  stagger: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'p';
}

function RevealLine({
  text,
  delay,
  stagger,
  className = '',
  style,
  as: Tag = 'p',
}: RevealLineProps) {
  const words = useMemo(() => text.split(' '), [text]);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Tag className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          <span
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(8px)',
              filter: 'blur(4px)',
              animation: reduced
                ? undefined
                : `introWord 600ms cubic-bezier(.2,.7,.2,1) forwards`,
              animationDelay: `${delay + i * stagger}ms`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [phase, setPhase] = useState<Phase>('entering');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhase('showing'), ENTER_MS);
    return () => clearTimeout(t);
  }, []);

  const startExit = () => {
    setPhase((p) => {
      if (p === 'exiting' || p === 'done') return p;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      onComplete?.();
      timerRef.current = setTimeout(() => setPhase('done'), EXIT_MS);
      return 'exiting';
    });
  };

  // Auto-exit after the second line has held for a beat
  useEffect(() => {
    if (phase !== 'showing') return;
    const totalLine2Ms =
      LINE2_DELAY + LINE_2.split(' ').length * 110 + HOLD_AFTER_LINE2;
    const t = setTimeout(startExit, totalLine2Ms);
    return () => clearTimeout(t);
  // startExit captures latest via setPhase callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') startExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center noise cursor-pointer overflow-hidden"
      onClick={startExit}
      role="dialog"
      aria-label="Welcome to Aunty Curl Council"
      style={{
        backgroundColor: '#1A0F08',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms ease-out`,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Single soft warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '640px',
          height: '640px',
          background: 'radial-gradient(circle, rgba(212,160,74,0.18) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Eyebrow */}
        <p
          className="font-body text-[10px] md:text-[11px] tracking-[0.45em] uppercase mb-7"
          style={{
            color: 'rgba(212,160,74,0.85)',
            opacity: 0,
            animation: 'introFade 700ms ease-out forwards',
            animationDelay: `${EYEBROW_DELAY}ms`,
          }}
        >
          Aunty Curl Council
        </p>

        {/* Line 1 — quiet lead-in */}
        <RevealLine
          text={LINE_1}
          delay={LINE1_DELAY}
          stagger={120}
          as="p"
          className="font-display text-xl md:text-2xl lg:text-3xl font-medium leading-[1.2] mb-6"
          style={{ color: 'rgba(254,248,236,0.55)' }}
        />

        {/* Line 2 — the payoff */}
        <RevealLine
          text={LINE_2}
          delay={LINE2_DELAY}
          stagger={110}
          as="h1"
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-shimmer leading-[1.05]"
        />
      </div>

      {/* Skip button — minimal, accessible */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          startExit();
        }}
        aria-label="Skip intro"
        className="absolute bottom-7 right-7 font-body text-[10px] tracking-[0.3em] uppercase rounded-full px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A04A] hover:text-[#D4A04A] transition-colors"
        style={{
          color: 'rgba(254,248,236,0.4)',
          opacity: 0,
          animation: 'introFade 800ms ease-out forwards',
          animationDelay: '600ms',
          background: 'transparent',
          border: '1px solid rgba(254,248,236,0.1)',
        }}
      >
        Skip
      </button>
    </div>
  );
}
