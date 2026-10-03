"use client";

import { Button } from "@/components/Button";
import { ProductVisual } from "@/components/ProductVisual";
import { useI18n } from "@/lib/i18n";
import { getProduct } from "@/lib/products";

export function PartView({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const product = getProduct(slug);
  if (!product) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("viewer.partKicker")}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{product.name[lang]}</h1>
      <p className="mt-4 leading-8 text-mute">{product.description[lang]}</p>
      <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl border border-line">
        <ProductVisual seed={product.slug} alt={product.name[lang]} className="h-full w-full" priority />
      </div>
      <p className="mt-4 text-sm text-mute">
        {product.specs.map((spec) => spec.value[lang]).join(" · ")}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={`/?part=${product.slug}#order`}>{t("viewer.order")}</Button>
        <Button href="/#how" variant="ghost">
          {t("viewer.back")}
        </Button>
      </div>
    </div>
  );
}
