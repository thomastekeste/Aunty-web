'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface FullScreenIntroProps {
  onComplete?: () => void;
}

type Phase = 'entering' | 'showing' | 'exiting' | 'done';

// ─── Copy ───
const LINE_1 = "Your hair isn't complicated.";
const LINE_2 = 'You just needed the right aunty.';

// ─── Timing ───
const ENTER_MS = 200;
const EYEBROW_DELAY = 200;
const LINE1_DELAY = 650;
const CHAR_STAGGER = 38; // ms per character
const CHAR_DURATION = 900; // per-char animation
const BEAT_BETWEEN = 650; // pause between lines
const HOLD_AFTER_LINE2 = 1000; // payoff hold
const EXIT_MS = 750;

interface CinematicLineProps {
  text: string;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'p';
}

function CinematicLine({
  text,
  delay,
  className = '',
  style,
  as: Tag = 'p',
}: CinematicLineProps) {
  const chars = useMemo(() => text.split(''), [text]);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Tag className={className} style={style} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: reduced ? 1 : 0,
            filter: reduced ? 'none' : 'blur(12px)',
            transform: reduced ? 'none' : 'translateY(40%) scale(1.1)',
            animation: reduced
              ? undefined
              : `cinematicReveal ${CHAR_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            animationDelay: `${delay + i * CHAR_STAGGER}ms`,
            whiteSpace: c === ' ' ? 'pre' : undefined,
            willChange: 'transform, opacity, filter',
          }}
        >
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </Tag>
  );
}

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [phase, setPhase] = useState<Phase>('entering');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Pre-compute timings
  const line2Delay = LINE1_DELAY + LINE_1.length * CHAR_STAGGER + BEAT_BETWEEN;
  const totalRevealMs =
    line2Delay + LINE_2.length * CHAR_STAGGER + CHAR_DURATION + HOLD_AFTER_LINE2;

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

  // Auto-exit after the payoff holds
  useEffect(() => {
    if (phase !== 'showing') return;
    const t = setTimeout(startExit, totalRevealMs);
    return () => clearTimeout(t);
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

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

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
        transform: isExiting ? 'scale(1.035)' : 'scale(1)',
        transition: `opacity ${EXIT_MS}ms ease-out, transform ${EXIT_MS}ms ease-out`,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Warm radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '820px',
          height: '820px',
          background:
            'radial-gradient(circle, rgba(212,160,74,0.22) 0%, rgba(212,160,74,0.06) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Soft secondary accent (warmth without vignette) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(194,69,110,0.12) 0%, transparent 65%)',
          bottom: '-10%',
          left: '10%',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl w-full">
        {/* Eyebrow */}
        <p
          className="font-body text-[10px] md:text-[11px] tracking-[0.45em] uppercase mb-8 md:mb-10"
          style={{
            color: 'rgba(212,160,74,0.85)',
            opacity: 0,
            animation: 'introFade 700ms ease-out forwards',
            animationDelay: `${EYEBROW_DELAY}ms`,
          }}
        >
          Aunty Curl Council
        </p>

        {/* Line 1 — the setup */}
        <CinematicLine
          text={LINE_1}
          delay={LINE1_DELAY}
          as="p"
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] mb-5 md:mb-7"
          style={{
            color: 'rgba(254,248,236,0.72)',
            letterSpacing: '-0.01em',
          }}
        />

        {/* Line 2 — the payoff */}
        <CinematicLine
          text={LINE_2}
          delay={line2Delay}
          as="h1"
          className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-shimmer leading-[1.05] tracking-[-0.02em]"
        />

        {/* Quiet handoff */}
        <p
          className="font-body text-[10px] md:text-[11px] tracking-[0.35em] uppercase mt-10 md:mt-12"
          style={{
            color: 'rgba(254,248,236,0.38)',
            opacity: 0,
            animation: 'introFade 900ms ease-out forwards',
            animationDelay: `${line2Delay + LINE_2.length * CHAR_STAGGER + 500}ms`,
          }}
        >
          Meet your council
        </p>
      </div>

      {/* Skip button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          startExit();
        }}
        aria-label="Skip intro"
        className="absolute bottom-7 right-7 font-body text-[10px] tracking-[0.3em] uppercase rounded-full px-3.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A04A] hover:text-[#D4A04A] hover:border-[#D4A04A]/40 transition-colors"
        style={{
          color: 'rgba(254,248,236,0.45)',
          opacity: 0,
          animation: 'introFade 800ms ease-out forwards',
          animationDelay: '600ms',
          background: 'rgba(254,248,236,0.03)',
          border: '1px solid rgba(254,248,236,0.12)',
        }}
      >
        Skip
      </button>
    </div>
  );
}
