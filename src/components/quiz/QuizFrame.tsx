"use client";

import StepDots from "./StepDots";

export default function QuizFrame({
  step, total, accent, eyebrow, title, hint, children, onBack, onClose,
}: {
  step: number; total: number; accent: string;
  eyebrow: string; title: string; hint?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
        <button onClick={onBack} disabled={!onBack}
          className="font-body text-xs text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors disabled:opacity-0">
          ← Back
        </button>
        <StepDots total={total} current={step} accent={accent} />
        <button onClick={onClose} aria-label="Close consultation"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pb-10 md:pb-16 pt-4 md:pt-12">
        <div className="w-full max-w-2xl mx-auto">
          <p className="font-body text-[11px] tracking-[3px] uppercase mb-3 text-center" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-bold text-[#2D1B0E] text-center mb-3 leading-[1.1]">
            {title}
          </h2>
          {hint && (
            <p className="font-body text-base text-[#6B5040] text-center mb-8 max-w-lg mx-auto">
              {hint}
            </p>
          )}
          {!hint && <div className="h-8" />}
          {children}
        </div>
      </div>
    </div>
  );
}
