"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [menuOpen]);

  const links = [
    { href: "/aunties",   label: "The Aunties" },
    { href: "/science",   label: "Our Science" },
    { href: "/products",  label: "Shop" },
  ];

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#FDFCF8]/96 backdrop-blur-xl border-b border-[rgba(26,15,8,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <Image
              src="/logo.png"
              alt="Aunty Council"
              width={28}
              height={28}
              className="rounded-lg object-cover"
            />
            <span className="font-display text-[15px] font-bold text-[#2D1B0E] tracking-[-0.01em]">
              Aunty Council
            </span>
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2D1B0E] after:transition-all hover:after:w-full"
                onClick={close}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#quiz"
              className="hidden sm:block px-5 py-2 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors"
              onClick={close}
            >
              Get Your Formula
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-30 bg-[#FDFCF8]/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="font-display text-xl font-medium text-[#2D1B0E] hover:text-[#6B5040] transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <a
          href="#quiz"
          onClick={close}
          className="mt-4 px-8 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[13px] font-semibold tracking-[1px] uppercase"
        >
          Get Your Formula
        </a>
      </div>
    </>
  );
}
