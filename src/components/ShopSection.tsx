"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import AuntyPortrait from "@/components/AuntyPortrait";
import { products } from "@/data/products";
import { aunties } from "@/data/aunties";

/** Featured picks — one strong seller per category, then fill */
const FEATURED_IDS = ["satin-bonnet", "silk-pillowcase", "silky-durag", "satin-scrunchie-pack"];

const COUNCIL_IDS = ["ngozi", "carmen", "salma"];

export default function ShopSection() {
  const featured = FEATURED_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const picks = featured.length >= 4 ? featured.slice(0, 4) : products.slice(0, 4);

  return (
    <section id="shop" className="bg-[#FDFCF8] border-b border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7 md:mb-10">
          <div>
            {/* Aunty curation strip */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center">
                {COUNCIL_IDS.map((id, i) => {
                  const aunty = aunties.find((a) => a.id === id);
                  return (
                    <div
                      key={id}
                      className="relative rounded-full border-[2px] border-[#FDFCF8] shadow-sm"
                      style={{
                        marginLeft: i === 0 ? 0 : -8,
                        zIndex: COUNCIL_IDS.length - i,
                      }}
                    >
                      <AuntyPortrait auntyId={id} size={36} bg={aunty?.bg ?? "#F5EBD5"} />
                    </div>
                  );
                })}
              </div>
              <span className="font-body text-[11px] text-[#6B5040] tracking-[0.5px]">
                Curated by the Aunty Council
              </span>
            </div>

            <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-3">
              Shop now — ships today
            </p>
            <h2 className="font-display text-[1.5rem] sm:text-[1.85rem] md:text-[2.2rem] font-bold text-[#1A0F08] leading-[1.1] tracking-[-0.03em]">
              The Marketplace
            </h2>
            <p className="font-body text-[13px] md:text-[15px] text-[#6B5040] leading-[1.7] mt-2 max-w-md">
              Bonnets, durags, silk pillowcases, tools &amp; skincare devices —
              curated for textured hair &amp; melanin-rich skin. No waitlist needed.
            </p>
          </div>
          <Link
            href="/products"
            className="flex-shrink-0 self-start sm:self-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-bold tracking-[1.5px] uppercase hover:bg-[#1A0F08] transition-colors"
          >
            Shop all products
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Category quick links */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { href: "/products?cat=sleep", label: "Sleep & Protection" },
            { href: "/products?cat=tools", label: "Tools & Brushes" },
            { href: "/products?cat=devices", label: "Skincare Devices" },
            { href: "/products?cat=hair", label: "Hair Products" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="font-body text-[12px] font-medium px-4 py-2 rounded-full bg-[#F7F5F0] text-[#6B5040] hover:bg-[#EDE9E3] hover:text-[#1A0F08] transition-colors"
            >
              {c.label} &rarr;
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
