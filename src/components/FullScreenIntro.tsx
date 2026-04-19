'use client';

import { useEffect, useRef, useState } from 'react';
import SmoothTyper from './SmoothTyper';

interface FullScreenIntroProps {
  onComplete?: () => void;
}

type Phase = 'entering' | 'typing' | 'exiting' | 'done';

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [phase, setPhase] = useState<Phase>('entering');
  const [line, setLine] = useState(0); // 0 = none, 1 = first done, 2 = show second, 3 = second done
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Lock scroll while the intro is on screen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Brief entrance fade before typing begins
  useEffect(() => {
    const t = setTimeout(() => setPhase('typing'), 220);
    return () => clearTimeout(t);
  }, []);

  const startExit = () => {
    if (phase === 'exiting' || phase === 'done') return;
    setPhase('exiting');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    onComplete?.();
    timerRef.current = setTimeout(() => setPhase('done'), 800);
  };

  // Escape key skips the intro for keyboard users
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startExit();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  // startExit is stable enough; including phase guards inside it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleLine1Done = () => {
    setLine(1);
    timerRef.current = setTimeout(() => setLine(2), 700);
  };

  const handleLine2Done = () => {
    setLine(3);
    timerRef.current = setTimeout(startExit, 1700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (phase === 'done') return null;

  const isEntering = phase === 'entering';
  const isExiting = phase === 'exiting';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center noise cursor-pointer overflow-hidden"
      onClick={startExit}
      style={{
        backgroundColor: '#1A0F08',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 800ms ease-out, transform 800ms ease-out',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Soft warm glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '720px',
          height: '720px',
          background: 'radial-gradient(circle, #D4A04A 0%, transparent 70%)',
          opacity: 0.06,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
        style={{
          opacity: isEntering ? 0 : 1,
          transform: isEntering ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="block h-px w-8"
            style={{ background: 'linear-gradient(to right, transparent, rgba(212,160,74,0.6))' }}
          />
          <p
            className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase"
            style={{ color: 'rgba(212, 160, 74, 0.85)' }}
          >
            Aunty &middot; Curl &middot; Council
          </p>
          <span
            className="block h-px w-8"
            style={{ background: 'linear-gradient(to left, transparent, rgba(212,160,74,0.6))' }}
          />
        </div>

        {/* Line 1 — quiet lead-in */}
        {phase !== 'entering' && (
          <SmoothTyper
            text="Before YouTube. Before TikTok."
            as="p"
            baseSpeed={48}
            startDelay={250}
            className="font-display text-xl md:text-2xl lg:text-3xl font-medium leading-[1.2] mb-5"
            style={{ color: 'rgba(254, 248, 236, 0.6)' }}
            cursor={line < 1}
            onComplete={handleLine1Done}
          />
        )}

        {/* Animated gold rule between lines */}
        <div
          className="my-2 h-px"
          style={{
            width: line >= 2 ? '64px' : '0px',
            background: 'linear-gradient(90deg, transparent, #D4A04A, transparent)',
            opacity: line >= 2 ? 1 : 0,
            transition: 'width 700ms ease-out, opacity 500ms ease-out',
          }}
        />

        {/* Line 2 — the payoff */}
        {line >= 2 && (
          <SmoothTyper
            text="There were the aunties."
            as="h1"
            baseSpeed={62}
            startDelay={250}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-shimmer leading-[1.05] mt-5"
            cursor={line < 3}
            onComplete={handleLine2Done}
          />
        )}
      </div>

      {/* Skip button — visible, keyboard-accessible */}
      <button
        onClick={(e) => { e.stopPropagation(); startExit(); }}
        className="absolute bottom-8 font-body text-[10px] tracking-[0.4em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A04A] rounded px-2 py-1"
        style={{
          color: 'rgba(254, 248, 236, 0.38)',
          opacity: isEntering ? 0 : 1,
          transition: 'opacity 800ms ease-out 400ms, color 200ms',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Skip intro"
      >
        tap / press Esc to enter
      </button>
    </div>
  );
}
