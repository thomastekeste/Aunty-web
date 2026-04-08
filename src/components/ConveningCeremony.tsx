"use client";

import { useState, useEffect, useRef } from "react";
import { aunties } from "@/data/aunties";
import {
  getConveningMessages,
  conveningChecklist,
  type CurlType,
  type Struggle,
  type Goal,
} from "@/data/quiz";

interface Props {
  curl: CurlType;
  struggle: Struggle;
  goal: Goal;
  onComplete: () => void;
}

export default function ConveningCeremony({ curl, struggle, goal, onComplete }: Props) {
  const messages = getConveningMessages(curl, struggle, goal);
  const [messageIndex, setMessageIndex] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const startTime = useRef(Date.now());

  // Show content after brief delay
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Cycle status messages every 2800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Show checklist items one by one
  useEffect(() => {
    const timers = conveningChecklist.map((_, i) =>
      setTimeout(() => setChecklistCount(i + 1), 1200 + i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-complete after minimum 6 seconds
  useEffect(() => {
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(6000 - elapsed, 0);
    const t = setTimeout(onComplete, remaining + 500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 text-center">
      <div
        className="transition-all duration-700"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {/* Title */}
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-8">
          The Council Is Convening
        </p>

        {/* 7 aunty dots */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {aunties.map((aunty, i) => (
            <div
              key={aunty.id}
              className={`w-8 h-8 rounded-full dot-${i + 1}`}
              style={{ backgroundColor: aunty.color }}
            />
          ))}
        </div>

        {/* Cycling status message */}
        <div className="h-8 mb-10 relative">
          {messages.map((msg, i) => (
            <p
              key={i}
              className="absolute inset-0 font-display text-lg italic transition-all duration-400"
              style={{
                color: "rgba(254,248,236,0.6)",
                opacity: messageIndex === i ? 1 : 0,
                transform: messageIndex === i ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Progress checklist */}
        <div className="inline-flex flex-col items-start gap-3 text-left">
          {conveningChecklist.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-check-in"
              style={{
                opacity: i < checklistCount ? 1 : 0,
                animationDelay: `${i * 100}ms`,
                visibility: i < checklistCount ? "visible" : "hidden",
              }}
            >
              <div className="w-5 h-5 rounded-full bg-[#D4A04A] flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4.5 7.5L8 3" stroke="#1A0F08" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-body text-sm text-[rgba(254,248,236,0.7)]">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="font-display text-base italic text-[rgba(254,248,236,0.3)] mt-12">
          Seven aunties. Your hair. Their expertise.
        </p>
      </div>
    </div>
  );
}
