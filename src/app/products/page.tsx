"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, bundles, type ProductCategory, type ProductSub } from "@/data/products";

type TopFilter = "all" | ProductCategory;

const TOP_FILTERS: { value: TopFilter; label: string }[] = [
  { value: "all",         label: "All" },
  { value: "hair",        label: "Haircare" },
  { value: "skin",        label: "Skincare" },
  { value: "accessories", label: "Accessories" },
];

const SUB_FILTERS: Record<string, { value: ProductSub; label: string }[]> = {
  hair: [
    { value: "low-porosity",  label: "Low Porosity" },
    { value: "high-porosity", label: "High Porosity" },
    { value: "scalp",         label: "Scalp" },
  ],
  skin: [
    { value: "hyperpigmentation", label: "Hyperpigmentation" },
    { value: "glow",              label: "Glow" },
    { value: "dryness",           label: "Dryness" },
    { value: "spf",               label: "SPF" },
    { value: "oily",              label: "Oily" },
    { value: "dry-ashy",          label: "Dry & Ashy" },
    { value: "combination",       label: "Combination" },
    { value: "balanced",          label: "Balanced" },
    { value: "sensitive",         label: "Sensitive" },
  ],
  accessories: [
    { value: "hair", label: "Hair" },
    { value: "skin", label: "Skin" },
  ],
};

const CATEGORY_ACCENT: Record<ProductCategory, string> = {
  hair: "#2D1B0E",
  skin: "#6B5040",
  accessories: "#9E8C7A",
};

function BundleCard({ bundle }: { bundle: typeof bundles[number] }) {
  return (
    <div className="rounded-2xl p-8 flex flex-col gap-5 bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)]">
      <div>
        <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-1.5">{bundle.name}</h3>
        <p className="font-body text-[13px] text-[#6B5040] leading-relaxed">{bundle.description}</p>
        <p className="font-body text-[11px] font-semibold tracking-[1px] uppercase text-[#9E8C7A] mt-2">
          {bundle.includes}
        </p>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div>
          <div className="font-display text-2xl font-bold text-[#2D1B0E]">${bundle.price}</div>
          <div className="font-body text-[12px] text-[#9E8C7A]">
            <span className="line-through">${bundle.originalPrice}</span>
            <span className="ml-1.5 font-semibold text-[#2D1B0E]">Save ${bundle.savings}</span>
          </div>
        </div>
        <Link
          href="/#quiz"
          className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 hover:opacity-60 transition-opacity"
        >
          Build my routine
        </Link>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [top, setTop] = useState<TopFilter>("all");
  const [sub, setSub] = useState<ProductSub | null>(null);

  const subOptions = top !== "all" ? (SUB_FILTERS[top] ?? []) : [];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (top !== "all" && p.category !== top) return false;
      if (sub && p.sub !== sub) return false;
      return true;
    });
  }, [top, sub]);

  const handleTopChange = (val: TopFilter) => {
    setTop(val);
    setSub(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[72px]">

        {/* Page header */}
        <div className="border-b border-[rgba(26,15,8,0.06)]">
          <div className="max-w-[1400px] mx-auto px-8 py-10">
            <h1 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-2">
              The shop
            </h1>
            <p className="font-body text-[15px] text-[#6B5040] max-w-lg leading-[1.7]">
              Every product is recommended by a specific aunty based on your hair or skin profile.
              Not sure which is yours?{" "}
              <Link href="/#quiz" className="text-[#2D1B0E] underline underline-offset-4 hover:opacity-60 transition-opacity">
                Take the free consultation.
              </Link>
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-[72px] z-30 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[rgba(26,15,8,0.06)]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="py-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                {TOP_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => handleTopChange(f.value)}
                    className={`flex-shrink-0 font-body text-[13px] font-medium pb-1 transition-all ${
                      top === f.value
                        ? "text-[#2D1B0E] border-b-[1.5px] border-[#2D1B0E]"
                        : "text-[#9E8C7A] hover:text-[#6B5040]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {subOptions.length > 0 && (
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setSub(null)}
                    className={`flex-shrink-0 font-body text-[12px] font-medium pb-0.5 transition-all ${
                      !sub ? "text-[#2D1B0E] border-b border-[#2D1B0E]" : "text-[#9E8C7A] hover:text-[#6B5040]"
                    }`}
                  >
                    All {top.charAt(0).toUpperCase() + top.slice(1)}
                  </button>
                  {subOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSub(s.value)}
                      className={`flex-shrink-0 font-body text-[12px] font-medium pb-0.5 transition-all ${
                        sub === s.value ? "text-[#2D1B0E] border-b border-[#2D1B0E]" : "text-[#9E8C7A] hover:text-[#6B5040]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-[1400px] mx-auto px-8 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#9E8C7A] font-body">
              No products found for that filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  accent={CATEGORY_ACCENT[p.category]}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bundles */}
        <div className="border-t border-[rgba(26,15,8,0.06)]">
          <div className="max-w-[1400px] mx-auto px-8 py-16">
            <div className="mb-8">
              <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-3">
                Bundles
              </p>
              <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-[#2D1B0E] tracking-[-0.02em]">
                The aunty-approved starter sets
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {bundles.map((b) => (
                <BundleCard key={b.id} bundle={b} />
              ))}
            </div>
          </div>
        </div>

        {/* Quiz CTA */}
        <div className="bg-[#2D1B0E] text-[#FDFCF8]">
          <div className="max-w-[1400px] mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-[1.75rem] md:text-[2rem] font-bold mb-2 tracking-[-0.02em]">
                Not sure which products are yours?
              </h2>
              <p className="font-body text-[15px] text-[rgba(253,252,248,0.55)]">
                Let your aunty decide. Two minutes. Personalised picks.
              </p>
            </div>
            <Link
              href="/#quiz"
              className="flex-shrink-0 font-body text-[12px] font-semibold tracking-[2px] uppercase px-8 py-4 rounded-full bg-[#FDFCF8] text-[#2D1B0E] hover:bg-white transition-colors"
            >
              Take the free consultation
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
