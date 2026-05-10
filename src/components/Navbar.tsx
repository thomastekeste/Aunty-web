"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SHOP_CATEGORIES = [
  {
    href: "/products?cat=hair",
    label: "Hair Care",
    desc: "Shampoos, conditioners, curl creams & treatments",
  },
  {
    href: "/products?cat=skin",
    label: "Skin Care",
    desc: "Serums, SPF, face wash & barrier creams",
  },
  {
    href: "/products?cat=accessories",
    label: "Accessories",
    desc: "Satin bonnets, combs & styling tools",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#FDFCF8]/96 backdrop-blur-xl border-b border-[rgba(26,15,8,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <Image src="/logo.png" alt="Aunty Council" width={28} height={28} className="rounded-lg object-cover" />
            <span className="font-display text-[15px] font-bold text-[#2D1B0E] tracking-[-0.01em]">
              Aunty Council
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "/aunties", label: "The Aunties" },
              { href: "/science", label: "Our Science" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2D1B0E] after:transition-all hover:after:w-full">
                {l.label}
              </Link>
            ))}

            {/* Shop dropdown */}
            <div ref={shopRef} className="relative">
              <button
                onClick={() => { if (!shopOpen) setActiveTab(0); setShopOpen(!shopOpen); }}
                className="flex items-center gap-1 font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors"
              >
                Shop
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {shopOpen && (
                <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[400px] bg-[#FDFCF8] rounded-2xl border border-[rgba(26,15,8,0.08)] shadow-[0_24px_60px_-8px_rgba(26,15,8,0.14)] z-50 overflow-hidden">
                  {/* Tab row */}
                  <div className="flex border-b border-[rgba(26,15,8,0.06)]">
                    {SHOP_CATEGORIES.map((cat, i) => (
                      <button key={cat.href}
                        onClick={() => setActiveTab(i)}
                        className={`flex-1 text-center py-3 font-body text-[10px] font-bold tracking-[1.5px] uppercase transition-all border-r last:border-r-0 border-[rgba(26,15,8,0.06)] ${
                          activeTab === i
                            ? "bg-[#1A0F08] text-[#FDFCF8]"
                            : "text-[#6B5040] hover:text-[#1A0F08] hover:bg-[rgba(26,15,8,0.03)]"
                        }`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Active category content */}
                  <div className="p-2">
                    {(() => {
                      const cat = SHOP_CATEGORIES[activeTab];
                      return (
                        <Link href={cat.href} onClick={() => setShopOpen(false)}
                          className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-[rgba(26,15,8,0.04)] transition-colors group/item">
                          <div>
                            <p className="font-body font-semibold text-[14px] text-[#1A0F08] mb-1">{cat.label}</p>
                            <p className="font-body text-[12px] text-[#1A0F08]/50 leading-relaxed">{cat.desc}</p>
                          </div>
                          <svg className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
                            <path d="M5 12h14M13 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      );
                    })()}
                    <div className="border-t border-[rgba(26,15,8,0.05)] mt-1 pt-1">
                      <Link href="/products" onClick={() => setShopOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2.5 font-body text-[11px] font-bold tracking-[1px] uppercase text-[#1A0F08]/35 hover:text-[#1A0F08] transition-colors">
                        View all products →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="#app"
              className="font-body text-[13px] font-medium text-[#6B5040] hover:text-[#2D1B0E] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2D1B0E] after:transition-all hover:after:w-full">
              The App
            </Link>
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a href="#quiz" onClick={close}
              className="hidden sm:block px-5 py-2 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors">
              Get Your Formula
            </a>
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
        <Link href="/aunties" onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">The Aunties</Link>
        <Link href="/science" onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">Our Science</Link>

        <button onClick={() => setMobileShopOpen(!mobileShopOpen)}
          className="flex items-center gap-2 font-display text-xl font-medium text-[#2D1B0E]">
          Shop
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
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

        <Link href="#app" onClick={close} className="font-display text-xl font-medium text-[#2D1B0E]">The App</Link>
        <a href="#quiz" onClick={close} className="mt-4 px-8 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[13px] font-semibold tracking-[1px] uppercase">
          Get Your Formula
        </a>
      </div>
    </>
  );
}
