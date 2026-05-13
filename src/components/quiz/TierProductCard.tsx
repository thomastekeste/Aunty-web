"use client";

import { getProductById } from "@/data/products";
import ProductIllustration from "./ProductIllustration";

export default function TierProductCard({ productId, reason, accent }: { productId: string; reason: string; accent: string }) {
  const product = getProductById(productId);
  if (!product) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(26,15,8,0.06)]">
      <div className="relative flex items-center justify-center py-8 bg-[#F7F5F0]">
        <ProductIllustration type={product.productType} color={accent} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-display text-base font-bold text-[#2D1B0E] leading-snug">{product.name}</h4>
          <span className="font-display text-lg font-bold text-[#2D1B0E] ml-3 flex-shrink-0">${product.price}</span>
        </div>
        {product.keyIngredients.length > 0 && (
          <div className="mb-3">
            <p className="font-body text-[9px] tracking-[2px] uppercase mb-1.5 font-semibold text-[#9E8C7A]">
              Key Actives
            </p>
            <div className="flex flex-wrap gap-1">
              {product.keyIngredients.map((ing) => (
                <span key={ing} className="font-body text-[10px] px-2.5 py-1 rounded-full font-medium bg-[#F7F5F0] text-[#6B5040]">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="p-3 rounded-lg bg-[#F7F5F0] border border-[rgba(26,15,8,0.04)]">
          <p className="font-body text-[10px] tracking-[2px] uppercase font-semibold mb-1" style={{ color: accent }}>
            Why the council picked this
          </p>
          <p className="font-body text-xs text-[#6B5040] leading-relaxed">{reason}</p>
        </div>
      </div>
    </div>
  );
}
