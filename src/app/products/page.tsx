"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
    { value: "low-porosity",    label: "Low Porosity" },
    { value: "high-porosity",   label: "High Porosity" },
    { value: "normal-porosity", label: "Normal Porosity" },
    { value: "scalp",           label: "Scalp" },
  ],
  skin: [
    { value: "universal", label: "Universal" },
    { value: "oily",      label: "Oily" },
  ],
  accessories: [
    { value: "hair", label: "Hair Tools" },
    { value: "skin", label: "Skin Tools" },
  ],
};

const CATEGORY_META: Partial<Record<ProductCategory, { title: string; desc: string; eyebrow: string; color: string }>> = {
  hair: {
    title: "Haircare",
    desc: "Shampoos, conditioners & curl cremes matched to your porosity",
    eyebrow: "By porosity",
    color: "#A0701E",
  },
  skin: {
    title: "Skincare",
    desc: "Face wash, serums & moisturizers built for melanin-rich skin",
    eyebrow: "By skin type",
    color: "#8B4A3A",
  },
  accessories: {
    title: "Accessories",
    desc: "Tools, bonnets, durags & skincare devices — everything your routine needs",
    eyebrow: "By type",
    color: "#3F6B52",
  },
};

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
          href="/#quiz"
          className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 hover:opacity-60 transition-opacity"
        >
          Build my routine
        </Link>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: ProductCategory;
  items: typeof products;
}) {
  const meta = CATEGORY_META[category]!;
  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-5 pb-4 border-b border-[rgba(26,15,8,0.06)]">
        <div className="flex flex-col gap-1">
          <span
            className="font-body text-[10px] font-bold tracking-[2.5px] uppercase"
            style={{ color: meta.color }}
          >
            {meta.eyebrow}
          </span>
          <h2 className="font-display text-[1.25rem] md:text-[1.5rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight">
            {meta.title}
          </h2>
          <p className="font-body text-[12px] text-[#6B5040] max-w-md">{meta.desc}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-display text-[20px] font-bold text-[#1A0F08]">
            {items.length}
          </span>
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
}

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const [top, setTop] = useState<TopFilter>(() => {
    const cat = searchParams.get("cat");
    return (cat === "hair" || cat === "skin" || cat === "accessories") ? cat : "all";
  });
  const [sub, setSub] = useState<ProductSub | null>(null);

  // Sync filter when URL param changes (e.g. browser back/forward)
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat === "hair" || cat === "skin" || cat === "accessories") {
      setTop(cat);
    } else {
      setTop("all");
    }
    setSub(null);
  }, [searchParams]);

  const subOptions = top !== "all" ? (SUB_FILTERS[top] ?? []) : [];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (top !== "all" && p.category !== top) return false;
      if (sub && p.sub !== sub) return false;
      return true;
    });
  }, [top, sub]);

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, []);

  const handleTopChange = (val: TopFilter) => {
    setTop(val);
    setSub(null);
  };

  const grouped = useMemo(() => {
    if (top !== "all") return null;
    const cats: ProductCategory[] = ["hair", "skin", "accessories"];
    return cats
      .map((c) => ({ category: c, items: products.filter((p) => p.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [top]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[72px]">

        {/* Compact header + filters */}
        <div className="sticky z-30 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[rgba(26,15,8,0.06)]" style={{ top: "var(--nav-offset, 72px)", transition: "top 300ms cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="py-3 flex items-center gap-4 flex-wrap">

              {/* Title */}
              <h1 className="font-display text-[1.1rem] md:text-[1.25rem] font-bold text-[#2D1B0E] tracking-[-0.02em] mr-2">
                Shop
              </h1>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {TOP_FILTERS.map((f) => {
                  const count = f.value === "all" ? products.length : (countByCategory[f.value] || 0);
                  const active = top === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => handleTopChange(f.value)}
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

              {/* Divider + Sub-filters inline */}
              {subOptions.length > 0 && (
                <>
                  <div className="w-px h-4 bg-[rgba(26,15,8,0.1)]" />
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                    <button
                      onClick={() => setSub(null)}
                      className={`flex-shrink-0 font-body text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-all ${
                        !sub
                          ? "bg-[#2D1B0E] text-[#FDFCF8]"
                          : "text-[#9E8C7A] border border-[rgba(26,15,8,0.1)] hover:text-[#6B5040]"
                      }`}
                    >
                      All
                    </button>
                    {subOptions.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setSub(s.value)}
                        className={`flex-shrink-0 font-body text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-all ${
                          sub === s.value
                            ? "bg-[#2D1B0E] text-[#FDFCF8]"
                            : "text-[#9E8C7A] border border-[rgba(26,15,8,0.1)] hover:text-[#6B5040]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-6 pb-10">
          {grouped ? (
            grouped.map((g) => (
              <CategorySection key={g.category} category={g.category} items={g.items} />
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-[#6B5040] font-body">
              No products found for that filter.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
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

        {/* Quiz CTA */}
        <div className="bg-[#2D1B0E] text-[#FDFCF8]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-bold mb-1.5 tracking-[-0.02em]">
                Not sure which products are yours?
              </h2>
              <p className="font-body text-[14px] text-[rgba(253,252,248,0.5)]">
                Let your aunty decide. Two minutes. Personalised picks.
              </p>
            </div>
            <Link
              href="/#quiz"
              className="flex-shrink-0 font-body text-[11px] font-semibold tracking-[2px] uppercase px-7 py-3.5 rounded-full bg-[#FDFCF8] text-[#2D1B0E] hover:bg-white transition-colors"
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

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
