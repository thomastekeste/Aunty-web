"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AffiliateProductCard from "@/components/AffiliateProductCard";
import { products, bundles, type AccessoryCategory } from "@/data/products";
import {
  affiliateProducts,
  AFFILIATE_CATEGORY_LABELS,
  type AffiliateCategory,
} from "@/data/affiliate-products";

type TopFilter = "all" | "hair" | AccessoryCategory;

const TOP_FILTERS: { value: TopFilter; label: string }[] = [
  { value: "all",     label: "All" },
  { value: "hair",    label: "Hair Products" },
  { value: "sleep",   label: "Sleep & Protection" },
  { value: "tools",   label: "Tools & Brushes" },
  { value: "devices", label: "Skincare Devices" },
];

const CATEGORY_META: Record<AccessoryCategory, { title: string; desc: string; eyebrow: string; color: string }> = {
  sleep: {
    title: "Sleep & Protection",
    desc: "Bonnets, durags, pillowcases & scrunchies — protect your curls overnight",
    eyebrow: "Night routine",
    color: "#6B4F8A",
  },
  tools: {
    title: "Tools & Brushes",
    desc: "Detanglers, edge brushes, scalp massagers & microfiber towels",
    eyebrow: "Wash day essentials",
    color: "#A0701E",
  },
  devices: {
    title: "Skincare Devices",
    desc: "LED masks, ice rollers, gua sha & derma rollers for melanin-rich skin",
    eyebrow: "Glow tools",
    color: "#3F6B52",
  },
};

/* ── Affiliate sub-categories present in catalog ── */
const affiliateCatSet = new Set(affiliateProducts.map((p) => p.category));
const affiliateCategories = (Object.keys(AFFILIATE_CATEGORY_LABELS) as AffiliateCategory[]).filter(
  (c) => affiliateCatSet.has(c)
);

function BundleCard({ bundle }: { bundle: typeof bundles[number] }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-4 bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)]">
      <div>
        <h3 className="font-display text-base md:text-lg font-bold text-[#2D1B0E] mb-1">{bundle.name}</h3>
        <p className="font-body text-[13px] text-[#6B5040] leading-relaxed">{bundle.description}</p>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div>
          <div className="font-display text-xl md:text-2xl font-bold text-[#2D1B0E]">${bundle.price}</div>
          <div className="font-body text-[12px] text-[#9E8C7A]">
            <span className="line-through">${bundle.originalPrice}</span>
            <span className="ml-1.5 font-semibold text-[#2D1B0E]">Save ${bundle.savings}</span>
          </div>
        </div>
        <Link
          href="/products"
          className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 hover:opacity-60 transition-opacity"
        >
          Add to bag
        </Link>
      </div>
    </div>
  );
}

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const [top, setTop] = useState<TopFilter>(() => {
    const cat = searchParams.get("cat");
    if (cat === "hair" || cat === "hair-care") return "hair";
    if (cat === "sleep" || cat === "tools" || cat === "devices") return cat;
    return "all";
  });
  const [affSub, setAffSub] = useState<AffiliateCategory | "all">("all");

  // Sync filter when URL param changes
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat === "hair" || cat === "hair-care") {
      setTop("hair");
    } else if (cat === "sleep" || cat === "tools" || cat === "devices") {
      setTop(cat);
    } else {
      setTop("all");
    }
  }, [searchParams]);

  // Reset affiliate sub-filter when leaving hair view
  useEffect(() => {
    if (top !== "hair") setAffSub("all");
  }, [top]);

  const filteredAccessories = useMemo(() => {
    if (top === "all" || top === "hair") return products;
    return products.filter((p) => p.category === top);
  }, [top]);

  const filteredAffiliate = useMemo(() => {
    if (affSub === "all") return affiliateProducts;
    return affiliateProducts.filter((p) => p.category === affSub);
  }, [affSub]);

  const totalCount = products.length + affiliateProducts.length;

  const countByFilter: Record<string, number> = useMemo(() => ({
    all: totalCount,
    hair: affiliateProducts.length,
    sleep: products.filter((p) => p.category === "sleep").length,
    tools: products.filter((p) => p.category === "tools").length,
    devices: products.filter((p) => p.category === "devices").length,
  }), [totalCount]);

  const affCountByCat = useMemo(() => {
    const counts: Record<string, number> = { all: affiliateProducts.length };
    affiliateProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[112px]">

        {/* Compact header + filters */}
        <div className="sticky z-30 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[rgba(26,15,8,0.06)]" style={{ top: "var(--nav-offset, 112px)", transition: "top 300ms cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="py-3 flex items-center gap-4 flex-wrap">

              {/* Title */}
              <h1 className="font-display text-[1.1rem] md:text-[1.25rem] font-bold text-[#2D1B0E] tracking-[-0.02em] mr-2">
                The Marketplace
              </h1>

              {/* Top-level filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {TOP_FILTERS.map((f) => {
                  const count = countByFilter[f.value] || 0;
                  const active = top === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setTop(f.value)}
                      className={`flex-shrink-0 font-body text-[11px] font-medium px-3.5 py-1 rounded-full transition-all ${
                        active
                          ? "bg-[#2D1B0E] text-[#FDFCF8]"
                          : "bg-[#F7F5F0] text-[#6B5040] hover:bg-[#EDE9E3]"
                      }`}
                    >
                      {f.label}
                      <span className={`ml-1 text-[9px] ${active ? "text-[rgba(253,252,248,0.5)]" : "text-[#9E8C7A]"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Affiliate sub-filters (only when Hair Products selected) */}
            {top === "hair" && (
              <div className="pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-hide border-t border-[rgba(26,15,8,0.04)] pt-2">
                <button
                  onClick={() => setAffSub("all")}
                  className={`flex-shrink-0 font-body text-[10px] font-medium px-3 py-0.5 rounded-full transition-all ${
                    affSub === "all"
                      ? "bg-[#C9903A] text-[#FDFCF8]"
                      : "bg-[#F7F5F0] text-[#6B5040] hover:bg-[#EDE9E3]"
                  }`}
                >
                  All <span className={`ml-0.5 text-[8px] ${affSub === "all" ? "text-[rgba(253,252,248,0.5)]" : "text-[#9E8C7A]"}`}>{affiliateProducts.length}</span>
                </button>
                {affiliateCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAffSub(cat)}
                    className={`flex-shrink-0 font-body text-[10px] font-medium px-3 py-0.5 rounded-full transition-all whitespace-nowrap ${
                      affSub === cat
                        ? "bg-[#C9903A] text-[#FDFCF8]"
                        : "bg-[#F7F5F0] text-[#6B5040] hover:bg-[#EDE9E3]"
                    }`}
                  >
                    {AFFILIATE_CATEGORY_LABELS[cat]}
                    <span className={`ml-0.5 text-[8px] ${affSub === cat ? "text-[rgba(253,252,248,0.5)]" : "text-[#9E8C7A]"}`}>
                      {affCountByCat[cat] || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-6 pb-10">

          {/* ── ALL view: accessories grouped by category, then affiliate ── */}
          {top === "all" && (
            <>
              {/* Accessories */}
              {(["sleep", "tools", "devices"] as AccessoryCategory[]).map((cat) => {
                const items = products.filter((p) => p.category === cat);
                if (items.length === 0) return null;
                const meta = CATEGORY_META[cat];
                return (
                  <section key={cat} className="mb-12">
                    <div className="flex items-end justify-between mb-5 pb-4 border-b border-[rgba(26,15,8,0.06)]">
                      <div className="flex flex-col gap-1">
                        <span className="font-body text-[10px] font-bold tracking-[2.5px] uppercase" style={{ color: meta.color }}>
                          {meta.eyebrow}
                        </span>
                        <h2 className="font-display text-[1.25rem] md:text-[1.5rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight">
                          {meta.title}
                        </h2>
                        <p className="font-body text-[12px] text-[#6B5040] max-w-md">{meta.desc}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-display text-[20px] font-bold text-[#1A0F08]">{items.length}</span>
                        <span className="font-body text-[10px] tracking-[1.5px] uppercase text-[#6B5040]">
                          {items.length === 1 ? "product" : "products"}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                      {items.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* Affiliate — Hair Products */}
              <section className="mb-12">
                <div className="flex items-end justify-between mb-5 pb-4 border-b border-[rgba(26,15,8,0.06)]">
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[10px] font-bold tracking-[2.5px] uppercase text-[#C9903A]">
                      Trusted brands
                    </span>
                    <h2 className="font-display text-[1.25rem] md:text-[1.5rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight">
                      Hair &amp; Skin Products
                    </h2>
                    <p className="font-body text-[12px] text-[#6B5040] max-w-md">
                      Vetted products from brands we trust — shop direct from each brand
                    </p>
                  </div>
                  <button
                    onClick={() => setTop("hair")}
                    className="flex-shrink-0 font-body text-[10px] font-semibold tracking-[1.5px] uppercase text-[#C9903A] hover:text-[#1A0F08] transition-colors"
                  >
                    View all {affiliateProducts.length} &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {affiliateProducts.slice(0, 8).map((p) => (
                    <AffiliateProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ── HAIR view: affiliate only ── */}
          {top === "hair" && (
            filteredAffiliate.length === 0 ? (
              <div className="text-center py-16 text-[#6B5040] font-body">
                No products found for that filter.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filteredAffiliate.map((p) => (
                  <AffiliateProductCard key={p.id} product={p} />
                ))}
              </div>
            )
          )}

          {/* ── Accessory category view ── */}
          {(top === "sleep" || top === "tools" || top === "devices") && (
            filteredAccessories.length === 0 ? (
              <div className="text-center py-16 text-[#6B5040] font-body">
                No products found for that filter.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filteredAccessories.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )
          )}
        </div>

        {/* Bundles */}
        <div className="border-t border-[rgba(26,15,8,0.06)] bg-[#FDFCF8]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-14">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-[#9E8C7A] mb-1">
                  Save more
                </p>
                <h2 className="font-display text-[1.25rem] md:text-[1.5rem] font-bold text-[#2D1B0E] tracking-[-0.02em]">
                  Starter bundles
                </h2>
              </div>
              <span className="font-body text-[12px] text-[#9E8C7A] hidden sm:block">
                {bundles.length} bundles
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {bundles.map((b) => (
                <BundleCard key={b.id} bundle={b} />
              ))}
            </div>
          </div>
        </div>

        {/* App CTA */}
        <div className="bg-[#2D1B0E] text-[#FDFCF8]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-bold mb-1.5 tracking-[-0.02em]">
                Want personalized picks?
              </h2>
              <p className="font-body text-[14px] text-[rgba(253,252,248,0.5)]">
                Download the app for daily coaching from 7 culturally-aware aunties.
              </p>
            </div>
            <Link
              href="/app"
              className="flex-shrink-0 font-body text-[11px] font-semibold tracking-[2px] uppercase px-7 py-3.5 rounded-full bg-[#FDFCF8] text-[#2D1B0E] hover:bg-white transition-colors"
            >
              Get the app
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
