"use client";

import { useEffect, useState } from "react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="bg-[#2D1B0E] px-6 py-3.5 flex items-center justify-between max-w-[1400px] mx-auto sm:rounded-t-2xl">
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
      </div>
    </div>
  );
}
