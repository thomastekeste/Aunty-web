"use client";

import { useState } from "react";
import AuntyCharacterIcon from "./AuntyCharacterIcon";

export default function QuizOnramp() {
  const [name, setName] = useState("");

  const handleStart = () => {
    window.location.hash = "quiz";
  };

  return (
    <section className="py-24 bg-[#F7F5F0]">
      <div className="max-w-[680px] mx-auto px-6">
        <div className="bg-[#FDFCF8] rounded-3xl border border-[rgba(26,15,8,0.06)] p-8 sm:p-12 flex flex-col items-center text-center gap-6">
          {/* Aunty avatars */}
          <div className="flex -space-x-2">
            {["ngozi", "denise", "marcia"].map((id) => (
              <div
                key={id}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FDFCF8]"
              >
                <AuntyCharacterIcon auntyId={id} size={40} />
              </div>
            ))}
          </div>

          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A]">
            Your custom formula awaits
          </p>

          <h2 className="font-display text-[1.75rem] sm:text-[2.1rem] font-bold text-[#2D1B0E] leading-[1.15] tracking-[-0.02em]">
            Let&apos;s start with your name
          </h2>

          <p className="font-body text-[14px] text-[#6B5040] leading-[1.7] max-w-md">
            7 questions. 2 minutes. Your aunties will build a personalized
            routine with products picked for your exact texture, porosity, and goals.
          </p>

          {/* Name input + CTA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStart();
            }}
            className="w-full max-w-sm flex flex-col gap-3 mt-2"
          >
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-full bg-[#F7F5F0] border border-[rgba(26,15,8,0.1)] font-body text-[15px] text-[#2D1B0E] placeholder:text-[#9E8C7A] focus:outline-none focus:border-[#2D1B0E] focus:ring-1 focus:ring-[#2D1B0E] transition-all"
              />
              {name.length > 0 && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#2D1B0E] text-[#FDFCF8] flex items-center justify-center hover:bg-[#1A0F08] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors"
            >
              Start My Consultation
            </button>
          </form>

          {/* Micro-trust */}
          <p className="font-body text-[12px] text-[#9E8C7A] mt-1">
            Free &middot; No account needed &middot; Results in 2 min
          </p>
        </div>
      </div>
    </section>
  );
}
