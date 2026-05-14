"use client";

import { useEffect, useState } from "react";
import { aunties } from "@/data/aunties";
import AuntyCard from "./AuntyCard";
import AuntySpeechBubble from "./AuntySpeechBubble";

export const SELECTED_AUNTY_KEY = "aunty:selected";

export default function AuntySelectorHero() {
  // Default to closed for SSR. We flip to open after mount.
  // The takeover shows on every fresh page load; closing it doesn't persist.
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedAunty = selectedId
    ? aunties.find((a) => a.id === selectedId) ?? null
    : null;

  useEffect(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  // Lock body scroll while takeover is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const persistSelection = (id: string) => {
    try {
      sessionStorage.setItem(SELECTED_AUNTY_KEY, id);
    } catch {
      /* ignore */
    }
  };

  const dismissTakeover = () => {
    setOpen(false);
    // Notify the rest of the app that an aunty was picked and the takeover closed
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("aunty:selected", { detail: { id: selectedId } }));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    persistSelection(id);
    setTimeout(() => {
      document
        .getElementById("aunty-speech-bubble")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleContinue = () => {
    dismissTakeover();
  };

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-[#FDFCF8]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aunty-selector-heading"
    >
      {/* Skip / close in corner */}
      <button
        onClick={dismissTakeover}
        className="fixed top-5 right-5 md:top-6 md:right-8 z-[210] font-body text-[11px] font-medium tracking-[1.5px] uppercase text-[#1A0F08]/40 hover:text-[#1A0F08]/80 transition-colors px-3 py-2"
        aria-label="Skip aunty selection and explore the site"
      >
        Skip →
      </button>

      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="max-w-[800px] mx-auto text-center mb-10 md:mb-14 pt-8">
          <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#C9903A] mb-4">
            Meet Your Council
          </p>
          <h1
            id="aunty-selector-heading"
            className="font-display text-[34px] md:text-[54px] lg:text-[62px] leading-[1.05] text-[#1A0F08] mb-4"
          >
            Pick the one who feels like home.
          </h1>
          <p className="font-body text-[15px] md:text-[17px] leading-relaxed text-[#6B5040] max-w-[560px] mx-auto">
            Seven aunties. Each one a different kind of wisdom. Choose the voice you want guiding your consultation.
          </p>
        </div>

        {/* Horizontal scroll of aunties */}
        <div className="w-full max-w-[1400px] mx-auto mb-10">
          <div
            className="flex gap-4 md:gap-5 overflow-x-auto pb-6 px-4 md:px-6 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              WebkitOverflowScrolling: "touch",
            }}
            role="radiogroup"
            aria-label="Choose your Aunty"
          >
            {aunties.map((aunty) => (
              <AuntyCard
                key={aunty.id}
                aunty={aunty}
                selected={selectedId === aunty.id}
                onClick={() => handleSelect(aunty.id)}
              />
            ))}
          </div>
          <p className="md:hidden text-center font-body text-[11px] text-[#1A0F08]/40 mt-2">
            ← swipe to see all 7 aunties →
          </p>
        </div>

        {/* Speech bubble area */}
        <div
          id="aunty-speech-bubble"
          className="w-full px-4 transition-all duration-500"
          style={{
            opacity: selectedAunty ? 1 : 0,
            transform: selectedAunty ? "translateY(0)" : "translateY(12px)",
            pointerEvents: selectedAunty ? "auto" : "none",
            minHeight: "260px",
          }}
        >
          {selectedAunty && (
            <AuntySpeechBubble
              aunty={selectedAunty}
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>
    </div>
  );
}
