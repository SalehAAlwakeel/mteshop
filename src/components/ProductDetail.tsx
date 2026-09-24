"use client";

import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import {
  defaultOptions,
  optionLabels,
  priceWithOptions,
  relatedProducts,
  type Product,
} from "@/lib/products";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  const add = useCart((s) => s.add);
  const [selected, setSelected] = useState(() => defaultOptions(product));
  const [added, setAdded] = useState(false);
  const price = useMemo(() => priceWithOptions(product, selected), [product, selected]);
  const related = relatedProducts(product.slug);

  function onAdd() {
    add({
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      unitPrice: price,
      options: optionLabels(product, selected),
      category: product.category,
      optionMap: selected,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-line">
          <ProductVisual
            category={product.category}
            seed={product.slug}
            alt={product.name[lang]}
            priority
            className="aspect-square"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            {t("product.sku")} {product.sku}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold">{product.name[lang]}</h1>
          <p className="mt-4 leading-8 text-mute">{product.description[lang]}</p>
          <p className="mt-6 text-sm text-sand">
            {t("product.lead")}: {product.leadTimeDays} {t("product.days")}
          </p>
          {product.fromPrice && <p className="mt-2 text-sm text-mute">{t("product.quoteNote")}</p>}

          <div className="mt-8 space-y-5">
            {product.options?.map((option) => (
              <div key={option.id}>
                <p className="mb-2 text-sm font-medium">{option.name[lang]}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const active = selected[option.id] === value.id;
                    return (
                      <motion.button
                        key={value.id}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [option.id]: value.id }))}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`min-h-10 rounded-full border px-3 py-2 text-sm ${
                          active ? "border-laser bg-laser/10 text-laser" : "border-line text-mute"
                        }`}
                      >
                        {value.label[lang]}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onAdd} variant={added ? "sand" : "primary"}>
              {added ? (
                <>
                  <Check size={16} /> {t("product.added")}
                </>
              ) : (
                t("product.add")
              )}
            </Button>
            <Button href="/quote" variant="ghost">
              {t("nav.quote")}
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-mute">
                {t("product.includes")}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {product.includes.map((item) => (
                  <li key={item.en}>· {item[lang]}</li>
                ))}
              </ul>
            </div>
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-mute">
                  {t("product.specs")}
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {product.specs.map((item) => (
                    <li key={item.label.en}>
                      <span className="text-mute">{item.label[lang]}: </span>
                      {item.value[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-semibold">{t("product.related")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
