"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/cart";

const SHOP_CATEGORIES = [
  {
    href: "/products?cat=hair",
    label: "Hair Products",
    desc: "Cleansers, conditioners, oils, gels & styling",
  },
  {
    href: "/products?cat=sleep",
    label: "Sleep & Protection",
    desc: "Bonnets, durags, silk pillowcases & satin scrunchies",
  },
  {
    href: "/products?cat=tools",
    label: "Tools & Brushes",
    desc: "Detanglers, edge brushes, scalp massagers & towels",
  },
  {
    href: "/products?cat=devices",
    label: "Skincare Devices",
    desc: "LED masks, ice rollers, gua sha & derma rollers",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const { count: cartCount } = useCart();
  const shopRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 60 && y > lastScrollY.current + 2) {
        setHidden(true);
        setShopOpen(false);
      } else if (y < lastScrollY.current - 2) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => setAuthed(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [menuOpen]);

  useEffect(() => {
    const navGone = hidden && !hovered && !menuOpen;
    document.documentElement.style.setProperty("--nav-offset", navGone ? "0px" : "112px");
  }, [hidden, hovered, menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const close = () => { setMenuOpen(false); setMobileShopOpen(false); };

  return (
    <>
      {/* Logo — sits inside a tall navbar band */}
      <Link
        href="/"
        onClick={close}
        className="fixed left-4 md:left-6 z-[60] pointer-events-auto flex items-center"
        style={{ top: 0, height: "112px" }}
      >
        <Image
          src="/logo.png"
          alt="Aunty Council"
          width={400}
          height={300}
          className="object-contain h-[88px] md:h-[100px] lg:h-[112px] w-auto"
          style={{ mixBlendMode: "multiply" }}
          priority
        />
      </Link>

      {/* Hover trigger zone — reveals navbar when mouse reaches top */}
      {hidden && !hovered && (
        <div
          className="fixed top-0 left-0 right-0 h-3 z-50"
          onMouseEnter={() => setHovered(true)}
        />
      )}
      <nav
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-[#FDFCF8]/95 backdrop-blur-xl ${
          scrolled || menuOpen
            ? "border-b border-[rgba(26,15,8,0.06)] shadow-[0_4px_24px_-12px_rgba(26,15,8,0.08)]"
            : ""
        }`}
        style={{
          top: hidden && !hovered && !menuOpen ? "-120px" : "0px",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-[112px] flex items-center justify-center gap-6">

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Shop dropdown — first */}
            <div ref={shopRef} className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center gap-1 font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors"
              >
                Shop
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {shopOpen && (
                <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[240px] bg-[#FDFCF8] rounded-xl border border-[rgba(26,15,8,0.08)] shadow-[0_16px_40px_-8px_rgba(26,15,8,0.12)] z-50 overflow-hidden p-1.5">
                  {SHOP_CATEGORIES.map((cat) => (
                    <Link key={cat.href} href={cat.href} onClick={() => setShopOpen(false)}
                      className="flex flex-col gap-0.5 px-3.5 py-2.5 rounded-lg hover:bg-[rgba(26,15,8,0.04)] transition-colors">
                      <span className="font-body font-semibold text-[13px] text-[#1A0F08]">{cat.label}</span>
                      <span className="font-body text-[11px] text-[#1A0F08]/40 leading-snug">{cat.desc}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[rgba(26,15,8,0.06)] mt-1 pt-1">
                    <Link href="/products" onClick={() => setShopOpen(false)}
                      className="flex items-center justify-center py-2 font-body text-[10px] font-bold tracking-[1.5px] uppercase text-[#1A0F08]/30 hover:text-[#1A0F08] transition-colors">
                      All products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {[
              { href: "/app", label: "The App" },
              { href: "/science", label: "Our Science" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2D1B0E] after:transition-all hover:after:w-full">
                {l.label}
              </Link>
            ))}

          </div>

          {/* Right: Log in + bag + CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link href={authed ? "/account" : "/login"}
              className="hidden md:block font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              {authed ? "Account" : "Log in"}
            </Link>

            {/* Bag + CTA pinned to the right on desktop */}
            <div className="hidden md:flex md:absolute md:right-8 items-center gap-3">
              <Link
                href="/checkout"
                aria-label={`Bag${cartCount > 0 ? ` (${cartCount} items)` : ""}`}
                className="relative inline-flex items-center justify-center w-9 h-9 text-[#6B5040] hover:text-[#2D1B0E] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C9903A] text-[#FDFCF8] font-body text-[10px] font-bold leading-none flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/products" onClick={close}
                  className="px-5 py-2 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors">
                  Shop Now
              </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px]" aria-label="Toggle menu">
              <span className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none" }} />
              <span className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-[1.5px] bg-[#2D1B0E] transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className="fixed inset-0 z-40 bg-[#FDFCF8]/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6 transition-all duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}>
        <button onClick={() => setMobileShopOpen(!mobileShopOpen)}
          className="flex items-center gap-2 font-display text-xl font-medium text-[#2D1B0E]">
          Shop
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            aria-hidden="true"
            className={`transition-transform ${mobileShopOpen ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        {mobileShopOpen && (
          <div className="flex flex-col items-center gap-3">
            {SHOP_CATEGORIES.map((cat) => (
              <Link key={cat.href} href={cat.href} onClick={close}
                className="font-body text-[15px] font-medium text-[#6B5040]">{cat.label}</Link>
            ))}
          </div>
        )}

        <Link href="/app" onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">The App</Link>
        <Link href="/science" onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">Our Science</Link>

        <Link href={authed ? "/account" : "/login"} onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">
          {authed ? "Account" : "Log in"}
        </Link>
        <Link href="/products" onClick={close} className="mt-4 px-8 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[13px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors">
            Shop Now
        </Link>
      </div>
    </>
  );
}
