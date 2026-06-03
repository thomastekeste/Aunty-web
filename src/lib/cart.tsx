"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";

const STORAGE_KEY = "aunty-cart";

export interface CartItem {
  id: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isInCart: (productId: string) => boolean;
  lastAdded: { id: string; ts: number } | null;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartItemArray(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        v !== null &&
        typeof v === "object" &&
        typeof (v as { id?: unknown }).id === "string" &&
        typeof (v as { qty?: unknown }).qty === "number"
    )
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ id: string; ts: number } | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isCartItemArray(parsed)) {
          setItems(parsed.filter((i) => i.qty > 0));
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === productId);
      if (existing) {
        return prev.map((p) =>
          p.id === productId ? { ...p, qty: Math.min(10, p.qty + 1) } : p
        );
      }
      return [...prev, { id: productId, qty: 1 }];
    });
    setLastAdded({ id: productId, ts: Date.now() });
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((p) => p.id !== productId);
      const clamped = Math.min(10, Math.floor(qty));
      return prev.map((p) => (p.id === productId ? { ...p, qty: clamped } : p));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      c += item.qty;
      const product = getProductById(item.id);
      if (product) s += product.price * item.qty;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    count,
    subtotal,
    isInCart,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ── Global "added to bag" toast ─────────────────────────────────────────── */

export function CartToast() {
  const { lastAdded, count } = useCart();
  const [dismissedTs, setDismissedTs] = useState<number | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    const t = window.setTimeout(() => setDismissedTs(lastAdded.ts), 4000);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  const visible = !!lastAdded && dismissedTs !== lastAdded.ts;
  const product = lastAdded ? getProductById(lastAdded.id) : null;

  return (
    <div
      className="fixed left-4 right-4 sm:left-auto sm:right-6 sm:w-[340px] z-[80] transition-all duration-300 ease-out"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-[#2D1B0E] text-[#FDFCF8] px-4 py-3.5 shadow-[0_16px_40px_-8px_rgba(26,15,8,0.4)]">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C9903A] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FDFCF8" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-body text-[13px] font-semibold truncate">
            {product ? product.name : "Item"} added to bag
          </p>
          <p className="font-body text-[11px] text-[rgba(253,252,248,0.55)]">
            {count} {count === 1 ? "item" : "items"} in your bag
          </p>
        </div>
        <Link
          href="/checkout"
          className="flex-shrink-0 font-body text-[10px] font-bold tracking-[1.5px] uppercase px-3.5 py-2 rounded-full bg-[#FDFCF8] text-[#2D1B0E] hover:bg-white transition-colors"
        >
          View bag
        </Link>
      </div>
    </div>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
