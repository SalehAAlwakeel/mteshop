"use client";

import { Button } from "@/components/Button";
import { ProductVisual } from "@/components/ProductVisual";
import { describeItem, useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import type { Category } from "@/lib/products";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { t, lang } = useI18n();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold">{t("cart.title")}</h1>
        <p className="mt-4 text-mute">{t("cart.empty")}</p>
        <Button href="/shop" className="mt-8">
          {t("cart.shop")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">{t("cart.title")}</h1>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-3xl border border-line bg-panel p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-2xl sm:w-32">
              <ProductVisual
                category={item.category as Category}
                seed={item.slug}
                alt={item.name[lang]}
                className="h-full w-full"
              />
            </div>
            <div className="flex-1">
              <Link href={`/shop/${item.slug}`} className="font-medium hover:text-laser">
                {item.name[lang]}
              </Link>
              <p className="mt-1 text-xs text-mute">{describeItem(item, lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                onClick={() => setQty(item.id, item.qty - 1)}
                aria-label="-"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm">{item.qty}</span>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                onClick={() => setQty(item.id, item.qty + 1)}
                aria-label="+"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                className="ms-2 text-mute hover:text-ember"
                onClick={() => remove(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line p-6 sm:flex-row sm:items-center">
        <Button href="/checkout">{t("cart.checkout")}</Button>
      </div>
    </div>
  );
}
