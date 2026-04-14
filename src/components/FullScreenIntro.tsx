'use client';

import { useEffect, useRef, useState } from 'react';
import SmoothTyper from './SmoothTyper';

interface FullScreenIntroProps {
  onComplete?: () => void;
}

type Phase = 'typing' | 'exiting' | 'done';

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [phase, setPhase] = useState<Phase>('typing');
  const [line, setLine] = useState(0);
  const exitTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const startExit = () => {
    if (phase !== 'typing') return;
    setPhase('exiting');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    onComplete?.();
    exitTimerRef.current = setTimeout(() => setPhase('done'), 700);
  };

  // Line 1 done → pause, then start line 2
  const handleLine1Done = () => {
    setLine(1);
    exitTimerRef.current = setTimeout(() => setLine(2), 600);
  };

  // Line 2 done → pause, then exit
  const handleLine2Done = () => {
    exitTimerRef.current = setTimeout(startExit, 1800);
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center noise cursor-pointer"
      onClick={startExit}
      style={{
        backgroundColor: '#1A0F08',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Soft background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #D4A04A 0%, transparent 70%)',
          opacity: 0.04,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl space-y-5">
        {/* Line 1 */}
        <SmoothTyper
          text="Hair care shouldn't be guesswork."
          as="h1"
          baseSpeed={50}
          startDelay={600}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-shimmer leading-[1.1]"
          cursor={line < 2}
          onComplete={handleLine1Done}
        />

        {/* Line 2 */}
        {line >= 2 && (
          <SmoothTyper
            text="Let the aunties guide you."
            as="p"
            baseSpeed={50}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-shimmer leading-[1.1]"
            cursor
            onComplete={handleLine2Done}
          />
        )}
      </div>

      {/* Skip hint */}
      <p
        className="absolute bottom-8 font-body text-xs tracking-widest uppercase pointer-events-none"
        style={{ color: 'rgba(254, 248, 236, 0.25)' }}
      >
        tap to skip
      </p>
    </div>
  );
}
