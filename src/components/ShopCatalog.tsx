"use client";

import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

export function ShopCatalog() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return products.filter((p) => {
      const inCat = filter === "all" || p.category === filter;
      const q = query.trim().toLowerCase();
      const inQuery =
        !q ||
        p.name.en.toLowerCase().includes(q) ||
        p.name.ar.includes(q) ||
        p.short.en.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [filter, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("shop.kicker")}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{t("shop.title")}</h1>
      <p className="mt-4 max-w-2xl text-mute">{t("shop.body")}</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm",
                filter === cat.id
                  ? "border-laser bg-laser/10 text-laser"
                  : "border-line text-mute hover:text-paper",
              )}
            >
              {cat.label[lang]}
            </motion.button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("shop.search")}
          className="w-full rounded-full border border-line bg-panel px-4 py-2.5 text-sm outline-none ring-laser/40 placeholder:text-mute focus:ring-2 md:max-w-xs"
        />
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-mute">{t("shop.empty")}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
