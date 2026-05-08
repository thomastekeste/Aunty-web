"use client";

import { useEffect, useState } from "react";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import { aunties } from "@/data/aunties";

/**
 * Floating "Ask aunty" CTA. Appears once user has scrolled past the hero.
 * Cycles through aunties to feel alive. Click → opens consultation.
 */
export default function AskAuntyWidget() {
  const [visible, setVisible] = useState(false);
  const [auntyIndex, setAuntyIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cycle aunty avatar every few seconds when not expanded
  useEffect(() => {
    if (expanded) return;
    const interval = setInterval(() => {
      setAuntyIndex((i) => (i + 1) % aunties.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [expanded]);

  const currentAunty = aunties[auntyIndex];

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-30 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}
    >
      {expanded ? (
        // Expanded chat-style card
        <div
          className="pointer-events-auto bg-[#FDFCF8] rounded-3xl shadow-[0_24px_64px_-16px_rgba(26,15,8,0.35)] border border-[rgba(26,15,8,0.08)] w-[300px] md:w-[340px] overflow-hidden"
          style={{ animation: "stickySlideUp 350ms ease-out forwards" }}
        >
          {/* Header */}
          <div
            className="relative px-5 py-4 flex items-center gap-3"
            style={{ background: `linear-gradient(135deg, ${currentAunty.gradient[0]}, ${currentAunty.gradient[1]})` }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#FDFCF8]/50 flex-shrink-0">
              <AuntyCharacterIcon auntyId={currentAunty.id} size={48} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[15px] font-bold text-[#1A0F08]">
                {currentAunty.name}
              </p>
              <p className="font-body text-[10px] font-bold tracking-[1.5px] uppercase text-[#1A0F08]/70 truncate">
                {currentAunty.title}
              </p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              aria-label="Minimize"
              className="w-7 h-7 rounded-full bg-[#1A0F08]/15 hover:bg-[#1A0F08]/25 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A0F08" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Greeting */}
          <div className="p-5 flex flex-col gap-3">
            <p className="font-display text-[14px] italic font-medium text-[#1A0F08] leading-snug">
              &ldquo;{currentAunty.greeting}&rdquo;
            </p>
            <p className="font-body text-[12px] text-[#6B5040] leading-relaxed">
              Take the consultation and {currentAunty.name} can pick a routine that&apos;s actually built for your texture.
            </p>

            <a
              href="#quiz"
              onClick={() => setExpanded(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-bold text-[11px] tracking-[1.5px] uppercase hover:bg-[#0F0905] transition-colors"
            >
              Start consultation
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="font-body text-[10px] text-[#9E8C7A] hover:text-[#3D2B1A] transition-colors mt-1 self-center"
            >
              Don&apos;t show this again
            </button>
          </div>
        </div>
      ) : (
        // Collapsed: floating aunty button
        <button
          onClick={() => setExpanded(true)}
          aria-label="Ask an aunty"
          className="pointer-events-auto group relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-[#FDFCF8] shadow-[0_12px_30px_-8px_rgba(26,15,8,0.25)] border border-[rgba(26,15,8,0.08)] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.35)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {/* Live indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A6B3A] opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#1A6B3A] ring-2 ring-[#FDFCF8]" />
          </span>

          <div
            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 transition-transform group-hover:scale-110 ring-2 ring-offset-2 ring-offset-[#FDFCF8]"
            style={{
              // @ts-expect-error -- TS doesn't know about ring-color CSS var
              "--tw-ring-color": currentAunty.color + "44",
            }}
          >
            <AuntyCharacterIcon auntyId={currentAunty.id} size={40} />
          </div>

          <div className="flex flex-col items-start text-left">
            <span className="font-body text-[10px] font-bold tracking-[1.5px] uppercase text-[#9E8C7A] leading-none">
              {currentAunty.name} is here
            </span>
            <span className="font-display text-[13px] font-bold text-[#1A0F08] leading-none mt-1">
              Ask an aunty
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
