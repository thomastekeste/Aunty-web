"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#quiz"
      className="fixed bottom-6 right-6 z-50 px-6 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body font-semibold text-[12px] tracking-[1px] uppercase shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:bg-[#1A0F08] hover:shadow-[0_6px_32px_rgba(0,0,0,0.25)] transition-all duration-300 flex items-center gap-2"
      style={{
        animation: "stickySlideUp 400ms ease-out",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
      Get Your Formula
    </a>
  );
}
