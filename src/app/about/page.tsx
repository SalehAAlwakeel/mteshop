"use client";

import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function AboutPage() {
  const { t, lang } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-laser">{t("about.kicker")}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{t("about.title")}</h1>
      <p className="mt-6 leading-8 text-mute">{t("about.p1")}</p>
      <p className="mt-4 leading-8 text-mute">{t("about.p2")}</p>
      <GlowCard className="mt-10 p-6">
        <p className="font-medium">{site.address[lang]}</p>
        <p className="mt-2 text-sm text-mute">{site.hours[lang]}</p>
        <p className="mt-2 text-sm text-sand">VAT {site.vatNumber}</p>
      </GlowCard>
      <Button href="/contact" className="mt-8">
        {t("about.visit")}
      </Button>
    </div>
  );
}
