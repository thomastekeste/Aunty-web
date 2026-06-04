"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { CATEGORY_THEME, ProductSilhouette } from "@/components/ProductCard";
import { products, type Product, type AccessoryCategory } from "@/data/products";
import { useCart } from "@/lib/cart";

const CATEGORY_LABEL: Record<AccessoryCategory, string> = {
  sleep: "Sleep & Protection",
  tools: "Tools & Brushes",
  devices: "Skincare Devices",
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const theme = CATEGORY_THEME[product.category];
  const displayName = product.name.startsWith("Aunty ") ? product.name.slice(6) : product.name;
  const inCart = isInCart(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[80px]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-8 pb-12 md:pb-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-4 md:mb-6 font-body text-[11px] text-[#9E8C7A]" aria-label="Breadcrumb">
            <Link href="/products" className="hover:text-[#2D1B0E] transition-colors">
              Marketplace
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/products?cat=${product.category}`} className="hover:text-[#2D1B0E] transition-colors">
              {CATEGORY_LABEL[product.category]}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[#2D1B0E] truncate max-w-[140px] sm:max-w-none">{displayName}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

            {/* ── Visual ── */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/5]"
              style={{
                background: theme.gradient,
                boxShadow: `0 16px 48px -16px ${theme.accent}44`,
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.18]"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
              >
                <g stroke={theme.pattern} strokeWidth="1" strokeLinecap="round" fill="none">
                  <path d="M10 30 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                  <path d="M10 60 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                  <path d="M10 90 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                  <path d="M10 120 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                  <path d="M10 150 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                  <path d="M10 180 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
                </g>
              </svg>

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[9px] font-bold tracking-[1.5px] uppercase backdrop-blur-md bg-[rgba(26,107,58,0.92)] text-[#FDFCF8]">
                  <span className="w-1 h-1 rounded-full bg-[#FDFCF8]" />
                  Ships now
                </span>
              </div>

              <div className="relative z-[2] h-full w-full flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="scale-150">
                    <ProductSilhouette type={product.productType} color="#1A0F08" />
                  </div>
                )}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="flex flex-col gap-5 md:gap-6 md:pt-2">
              <div>
                <p
                  className="font-body text-[10px] font-bold tracking-[2.5px] uppercase mb-2"
                  style={{ color: theme.accent }}
                >
                  {CATEGORY_LABEL[product.category]}
                </p>
                <h1 className="font-display text-[1.75rem] md:text-[2.25rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight mb-2">
                  {displayName}
                </h1>
                <p className="font-body text-[15px] text-[#6B5040] leading-relaxed">
                  {product.painPoint}
                </p>
              </div>

              <div className="font-display text-[1.5rem] md:text-[1.75rem] font-bold text-[#1A0F08]">
                ${product.price}
              </div>

              {/* Add to bag */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body text-[12px] font-bold tracking-[1.5px] uppercase transition-colors"
                  style={{
                    background: justAdded ? "#1A6B3A" : "#2D1B0E",
                    color: "#FDFCF8",
                  }}
                >
                  {justAdded ? (
                    <>
                      Added to bag
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </>
                  ) : inCart ? (
                    "Add another"
                  ) : (
                    "Add to bag"
                  )}
                </button>
                {inCart && (
                  <Link
                    href="/checkout"
                    className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body text-[12px] font-bold tracking-[1.5px] uppercase border border-[#2D1B0E] text-[#2D1B0E] hover:bg-[#2D1B0E] hover:text-[#FDFCF8] transition-colors"
                  >
                    View bag &rarr;
                  </Link>
                )}
              </div>

              {/* Why it works */}
              <div className="rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)] p-5">
                <p className="font-body text-[9px] font-bold tracking-[2.5px] uppercase mb-2" style={{ color: theme.accent }}>
                  Why it works
                </p>
                <p className="font-body text-[14px] text-[#3D2B1A] leading-relaxed">
                  {product.whyItWorks}
                </p>
              </div>

              {/* Features */}
              {product.keyIngredients.length > 0 && (
                <div>
                  <p className="font-body text-[9px] font-bold tracking-[2.5px] uppercase text-[#9E8C7A] mb-3">
                    What you get
                  </p>
                  <ul className="flex flex-col gap-2">
                    {product.keyIngredients.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 font-body text-[14px] text-[#3D2B1A]">
                        <svg className="flex-shrink-0 mt-[3px]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ── Related ── */}
          {related.length > 0 && (
            <section className="mt-14 md:mt-20">
              <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-[rgba(26,15,8,0.06)]">
                <h2 className="font-display text-[1.15rem] md:text-[1.4rem] font-bold text-[#1A0F08] tracking-[-0.02em]">
                  More from {CATEGORY_LABEL[product.category]}
                </h2>
                <Link
                  href={`/products?cat=${product.category}`}
                  className="font-body text-[10px] font-semibold tracking-[1.5px] uppercase text-[#9E8C7A] hover:text-[#1A0F08] transition-colors"
                >
                  View all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
