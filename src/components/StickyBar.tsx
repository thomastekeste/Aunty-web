"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isLive } from "@/lib/launchMode";
import WaitlistForm from "@/components/WaitlistForm";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the modal on Escape.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  function handleWaitlistClick() {
    if (onHome) {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setModalOpen(true);
    }
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="bg-[#2D1B0E] px-6 py-3.5 flex items-center justify-between max-w-[1400px] mx-auto sm:rounded-t-2xl">
          {isLive ? (
            <>
              <p className="font-body text-[13px] text-[#E8DCC8] hidden sm:block">
                Curated products for textured hair &amp; melanin-rich skin
              </p>
              <p className="font-body text-[13px] text-[#E8DCC8] sm:hidden">
                Shop curated products
              </p>
              <a
                href="/products"
                className="px-5 py-2 rounded-full bg-[#FDFCF8] text-[#2D1B0E] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-white transition-colors flex-shrink-0"
              >
                Shop Now
              </a>
            </>
          ) : (
            <>
              <p className="font-body text-[13px] text-[#E8DCC8] hidden sm:block">
                The aunties are coming — be first in line
              </p>
              <p className="font-body text-[13px] text-[#E8DCC8] sm:hidden">
                Be first in line
              </p>
              <button
                onClick={handleWaitlistClick}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:opacity-90 transition-opacity flex-shrink-0"
              >
                Join the Waitlist
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inline modal for non-homepage waitlist signups */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#1A0F08]/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#1A0F08] border border-[#D4A04A]/20 p-7 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#F3E9DD]/50 hover:text-[#F3E9DD] hover:bg-[#F3E9DD]/[0.06] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="font-body text-[11px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-3">
              Coming soon
            </p>
            <h3 className="font-display text-[1.5rem] font-bold text-[#F3E9DD] leading-tight mb-2">
              The aunties are almost ready for you.
            </h3>
            <p className="font-body text-[14px] text-[#F3E9DD]/60 leading-relaxed mb-6">
              Join the list. Get 20% off your first month when the app drops.
            </p>
            <WaitlistForm source="sticky" variant="dark" />
          </div>
        </div>
      )}
    </>
  );
}
