"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/cart";
import { getProductById, type Product } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 6;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LineRowProps {
  product: Product;
  qty: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}

function LineRow({ product, qty, onInc, onDec, onRemove }: LineRowProps) {
  const lineTotal = product.price * qty;
  return (
    <div className="flex gap-4 py-5 border-b border-[rgba(26,15,8,0.08)]">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#F7F5F0] flex-shrink-0">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[15px] md:text-[16px] font-semibold text-[#1A0F08] leading-snug truncate">
              {product.name}
            </h3>
            <p className="font-body text-[12px] text-[#6B5040] mt-0.5">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="font-display text-[15px] md:text-[16px] font-semibold text-[#1A0F08] whitespace-nowrap">
            ${lineTotal.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center border border-[rgba(26,15,8,0.15)] rounded-full">
            <button
              type="button"
              onClick={onDec}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-[#6B5040] hover:text-[#1A0F08] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="font-body text-[13px] font-semibold text-[#1A0F08] w-6 text-center">
              {qty}
            </span>
            <button
              type="button"
              onClick={onInc}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-[#6B5040] hover:text-[#1A0F08] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="font-body text-[11px] font-medium tracking-[1px] uppercase text-[#9E8C7A] hover:text-[#1A0F08] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, addItem, updateQty, removeItem, subtotal, count } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo(() => {
    return items
      .map((item) => {
        const product = getProductById(item.id);
        return product ? { product, qty: item.qty } : null;
      })
      .filter((r): r is { product: Product; qty: number } => r !== null);
  }, [items]);

  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const emailValid = EMAIL_RE.test(email);

  const handleCheckout = async () => {
    setError(null);
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (rows.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: items.map((i) => ({ productId: i.id, quantity: i.qty })),
          email,
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Checkout failed. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[88px] pb-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="mb-8 md:mb-10">
            <span className="font-body text-[10px] font-bold tracking-[2.5px] uppercase text-[#C9903A]">
              Your bag
            </span>
            <h1 className="font-display text-[1.75rem] md:text-[2.25rem] font-bold text-[#1A0F08] tracking-[-0.02em] mt-1">
              Checkout
            </h1>
          </div>

          {rows.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F5F0] flex items-center justify-center text-[#6B5040]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
              </div>
              <h2 className="font-display text-[1.25rem] font-semibold text-[#1A0F08]">
                Your bag is empty
              </h2>
              <p className="font-body text-[14px] text-[#6B5040] max-w-sm">
                Browse the council&apos;s picks and add what speaks to you.
              </p>
              <Link
                href="/products"
                className="mt-2 px-6 py-3 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors"
              >
                Shop products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">
              {/* Items */}
              <section>
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,15,8,0.12)]">
                  <h2 className="font-display text-[1rem] font-semibold text-[#1A0F08]">
                    {count} {count === 1 ? "item" : "items"}
                  </h2>
                  <Link
                    href="/products"
                    className="font-body text-[11px] font-medium tracking-[1px] uppercase text-[#6B5040] hover:text-[#1A0F08] transition-colors"
                  >
                    Keep shopping
                  </Link>
                </div>
                <div>
                  {rows.map(({ product, qty }) => (
                    <LineRow
                      key={product.id}
                      product={product}
                      qty={qty}
                      onInc={() => addItem(product.id)}
                      onDec={() => updateQty(product.id, qty - 1)}
                      onRemove={() => removeItem(product.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Summary */}
              <aside className="lg:sticky lg:top-[96px] lg:self-start">
                <div className="rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)] p-6 md:p-7 flex flex-col gap-5">
                  <h2 className="font-display text-[1.1rem] font-semibold text-[#1A0F08]">
                    Order summary
                  </h2>

                  <div className="flex flex-col gap-2.5 font-body text-[13px]">
                    <div className="flex justify-between text-[#6B5040]">
                      <span>Subtotal</span>
                      <span className="text-[#1A0F08] font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6B5040]">
                      <span>Shipping</span>
                      <span className="text-[#1A0F08] font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="font-body text-[11px] text-[#9E8C7A] leading-relaxed">
                        Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping.
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-[rgba(26,15,8,0.1)]">
                    <span className="font-body text-[12px] tracking-[1.5px] uppercase text-[#6B5040]">
                      Total
                    </span>
                    <span className="font-display text-[1.5rem] font-bold text-[#1A0F08]">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="checkout-email"
                      className="font-body text-[11px] font-semibold tracking-[1px] uppercase text-[#6B5040]"
                    >
                      Email
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-full bg-[#FDFCF8] border border-[rgba(26,15,8,0.12)] font-body text-[13px] text-[#1A0F08] placeholder:text-[#9E8C7A] focus:outline-none focus:border-[#C9903A] transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="font-body text-[12px] text-[#A33A2A] leading-relaxed">
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading || !emailValid}
                    className="w-full px-6 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body text-[12px] font-semibold tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Redirecting…" : "Checkout"}
                  </button>

                  <p className="font-body text-[11px] text-[#9E8C7A] text-center leading-relaxed">
                    Secure payment via Stripe.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
