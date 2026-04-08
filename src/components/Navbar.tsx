"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A0F08]/90 backdrop-blur-xl border-b border-[rgba(254,248,236,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Aunty Curl Council" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display text-lg font-bold text-[#FEF8EC]">
            Aunty Curl Council
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#council"
            className="font-body text-sm text-[rgba(254,248,236,0.5)] hover:text-[#FEF8EC] transition-colors"
          >
            The Aunties
          </a>
          <a
            href="#features"
            className="font-body text-sm text-[rgba(254,248,236,0.5)] hover:text-[#FEF8EC] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#quiz"
            className="font-body text-sm text-[rgba(254,248,236,0.5)] hover:text-[#FEF8EC] transition-colors"
          >
            Try The Quiz
          </a>
        </div>

        {/* CTA */}
        <a
          href="#waitlist"
          className="font-body text-sm font-semibold px-5 py-2 rounded-full bg-[#D4A04A] text-[#1A0F08] hover:bg-[#B8862E] transition-colors"
        >
          Get Early Access
        </a>
      </div>
    </nav>
  );
}
