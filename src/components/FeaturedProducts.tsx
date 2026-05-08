"use client";

import Link from "next/link";
import { products, type ProductCategory } from "@/data/products";
import ProductCard from "./ProductCard";

const FEATURED_IDS = ["deep-conditioner", "pih-serum", "scalp-serum"];

const CATEGORY_ACCENT: Record<ProductCategory, string> = {
  hair: "#2D1B0E",
  skin: "#6B5040",
  accessories: "#9E8C7A",
};

export default function FeaturedProducts() {
  const featured = products.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="py-16 md:py-24 bg-[#FDFCF8]">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header — Prose style: category name left, link right */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em]">
              Custom haircare &amp; skincare
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:block font-body text-[12px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 hover:opacity-60 transition-opacity"
          >
            Shop all
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} accent={CATEGORY_ACCENT[product.category]} />
            </div>
          ))}
        </div>

        {/* Mobile shop all link */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/products"
            className="font-body text-[12px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5"
          >
            Shop all {products.length} products
          </Link>
        </div>

      </div>
    </section>
  );
}
