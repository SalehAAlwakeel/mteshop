"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-laser">404</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{t("notFound.title")}</h1>
      <p className="mt-4 text-mute">{t("notFound.body")}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/shop">{t("nav.shop")}</Button>
        <Button href="/quote" variant="ghost">
          {t("nav.quote")}
        </Button>
      </div>
    </div>
  );
}
