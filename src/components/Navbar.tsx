"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  const links = [
    { href: "#features", label: "How It Works" },
    { href: "#council", label: "The Aunties" },
    { href: "#quiz", label: "Try The Quiz" },
    { href: "#pricing", label: "Pricing" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#FEF8EC]/95 backdrop-blur-xl border-b border-[rgba(26,15,8,0.08)] shadow-[0_2px_16px_rgba(26,15,8,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5" onClick={handleLinkClick}>
            <Image
              src="/logo.png"
              alt="Aunty Curl Council"
              width={32}
              height={32}
              className="rounded-lg object-cover"
            />
            <span className="font-display text-lg font-bold text-[#1A0F08]">
              Aunty Curl Council
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-sm text-[rgba(26,15,8,0.5)] hover:text-[#1A0F08] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* CTA — points to pricing */}
            <a
              href="#pricing"
              className="hidden sm:block font-body text-sm font-semibold px-5 py-2 rounded-full bg-[#D4A04A] text-[#1A0F08] hover:bg-[#B8862E] transition-colors"
              onClick={handleLinkClick}
            >
              Become a Founder
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[2px] bg-[#1A0F08] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen
                    ? "translateY(3.5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-[2px] bg-[#1A0F08] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-[2px] bg-[#1A0F08] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen
                    ? "translateY(-3.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-30 bg-[#FEF8EC]/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={handleLinkClick}
            className="font-display text-2xl font-bold text-[#1A0F08] hover:text-[#D4A04A] transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#pricing"
          onClick={handleLinkClick}
          className="mt-4 px-8 py-3.5 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-bold text-base hover:bg-[#B8862E] transition-colors"
        >
          Become a Founder
        </a>
        <a
          href="#waitlist"
          onClick={handleLinkClick}
          className="font-body text-sm text-[rgba(26,15,8,0.4)] hover:text-[#1A0F08] transition-colors"
        >
          or just get notified at launch
        </a>
      </div>
    </>
  );
}
