"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { optionKey } from "./format";
import { optionLabels, type Copy } from "./products";

export type CartItem = {
  id: string;
  slug: string;
  sku: string;
  name: Copy;
  unitPrice: number;
  qty: number;
  options: { name: Copy; value: Copy }[];
  category: string;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id" | "qty"> & { qty?: number; optionMap?: Record<string, string> }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const id = `${item.slug}::${optionKey(item.optionMap)}`;
        const existing = get().items.find((row) => row.id === id);
        if (existing) {
          set({
            items: get().items.map((row) =>
              row.id === id ? { ...row, qty: row.qty + (item.qty ?? 1) } : row,
            ),
          });
          return;
        }
        set({
          items: [
            ...get().items,
            {
              id,
              slug: item.slug,
              sku: item.sku,
              name: item.name,
              unitPrice: item.unitPrice,
              qty: item.qty ?? 1,
              options: item.options,
              category: item.category,
            },
          ],
        });
      },
      setQty: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((row) => row.id !== id) });
          return;
        }
        set({
          items: get().items.map((row) => (row.id === id ? { ...row, qty } : row)),
        });
      },
      remove: (id) => set({ items: get().items.filter((row) => row.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: "mte-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

export function describeItem(item: CartItem, lang: "en" | "ar") {
  const opts = item.options.map((o) => `${o.name[lang]}: ${o.value[lang]}`).join(" · ");
  return opts ? `${item.name[lang]} (${opts})` : item.name[lang];
}

export { optionLabels };
