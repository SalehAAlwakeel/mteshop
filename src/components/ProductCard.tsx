"use client";

import { GlowCard } from "@/components/GlowCard";
import { ProductVisual } from "@/components/ProductVisual";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n();

  return (
    <GlowCard href={`/shop/${product.slug}`} className="shine">
      <div className="relative aspect-4/3">
        <ProductVisual
          category={product.category}
          seed={product.slug}
          alt={product.name[lang]}
          className="h-full w-full"
        />
        {product.bestseller && (
          <span className="absolute top-3 start-3 z-30 rounded-full bg-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
            {lang === "ar" ? "الأكثر طلباً" : "Bestseller"}
          </span>
        )}
        {product.madeToOrder && !product.bestseller && (
          <span className="absolute top-3 start-3 z-30 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sand backdrop-blur">
            {t("product.made")}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
          {product.category === "3d-printing"
            ? lang === "ar"
              ? "طباعة"
              : "Print"
            : product.category === "carbon-fiber"
              ? lang === "ar"
                ? "كربون"
                : "Carbon"
              : lang === "ar"
                ? "ليزر"
                : "Laser"}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold">{product.name[lang]}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-mute">{product.short[lang]}</p>
      </div>
    </GlowCard>
  );
}
