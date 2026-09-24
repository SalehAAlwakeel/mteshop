"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/lib/i18n";
import { motion } from "motion/react";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="laser-scan" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-laser"
        >
          {t("hero.kicker")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="font-display mt-4 max-w-3xl text-3xl leading-[1.15] font-semibold sm:text-5xl lg:text-6xl"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-6 max-w-2xl text-base leading-8 text-mute"
        >
          {t("hero.body")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button href="/shop">{t("hero.shop")}</Button>
          <Button href="/quote" variant="ghost">
            {t("hero.quote")}
          </Button>
        </motion.div>
        <p className="mt-6 text-sm text-sand">{t("hero.pickup")}</p>
      </div>
    </section>
  );
}
