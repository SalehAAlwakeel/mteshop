"use client";

import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/products";
import { ArrowUpRight, Box, Hexagon, Zap } from "lucide-react";

const serviceCards = [
  {
    href: "/services#print",
    icon: Box,
    title: "services.printTitle" as const,
    body: "services.printBody" as const,
  },
  {
    href: "/services#carbon",
    icon: Hexagon,
    title: "services.carbonTitle" as const,
    body: "services.carbonBody" as const,
  },
  {
    href: "/services#laser",
    icon: Zap,
    title: "services.laserTitle" as const,
    body: "services.laserBody" as const,
  },
];

const materials = [
  "PLA",
  "PLA+",
  "PETG",
  "CPE",
  "ABS",
  "ASA",
  "TPU",
  "PLA/CF",
  "ABS/CF",
  "PPS",
  "PA",
  "3K twill carbon",
  "Cast acrylic",
];

export function HomePage() {
  const { t } = useI18n();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <div className="border-y border-line bg-ink-2/80">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {(["trust.vat", "trust.files", "trust.hours", "trust.ksa"] as const).map((key) => (
            <p key={key} className="px-4 py-4 text-center text-xs tracking-wide text-mute sm:text-sm">
              {t(key)}
            </p>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("nav.services")}</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">{t("services.title")}</h2>
          <p className="mt-4 max-w-2xl text-mute leading-7">{t("services.body")}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {serviceCards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <GlowCard href={card.href} className="p-6">
                <card.icon className="text-laser transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(61,255,210,0.8)]" />
                <h3 className="font-display mt-5 text-2xl">{t(card.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-mute">{t(card.body)}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-sand transition group-hover:text-laser group-hover:translate-x-1">
                  {t("services.more")} <ArrowUpRight size={16} />
                </span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("featured.kicker")}</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">{t("featured.title")}</h2>
            <p className="mt-4 max-w-xl text-mute">{t("featured.body")}</p>
          </div>
          <Button href="/shop" variant="ghost" className="text-sm">
            {t("featured.all")}
          </Button>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t("process.title")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {(
            [
              ["process.s1t", "process.s1b"],
              ["process.s2t", "process.s2b"],
              ["process.s3t", "process.s3b"],
              ["process.s4t", "process.s4b"],
            ] as const
          ).map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.07}>
              <GlowCard className="p-5">
                <div className="mb-4 h-px w-12 bg-laser" />
                <h3 className="font-display text-xl">{t(title)}</h3>
                <p className="mt-3 text-sm leading-7 text-mute">{t(body)}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-line py-8">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.28em] text-mute">{t("materials.title")}</p>
        <div className="marquee-track text-2xl font-display text-paper/80">
          {[...materials, ...materials].map((item, i) => (
            <span key={i} className="px-2">
              {item}
              <span className="mx-6 text-laser">/</span>
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-mute">{t("materials.body")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold">{t("faq.title")}</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-line rounded-3xl border border-line">
          {(
            [
              ["faq.q1", "faq.a1"],
              ["faq.q2", "faq.a2"],
              ["faq.q3", "faq.a3"],
              ["faq.q4", "faq.a4"],
            ] as const
          ).map(([q, a]) => (
            <details key={q} className="group px-6 py-5">
              <summary className="cursor-pointer list-none font-medium marker:content-none">
                {t(q)}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-mute">{t(a)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,255,210,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,90,42,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-display max-w-xl text-4xl font-semibold">{t("cta.title")}</h2>
            <p className="mt-4 max-w-xl text-mute">{t("cta.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote">{t("cta.quote")}</Button>
              <Button href="/contact" variant="ghost">
                {t("cta.whatsapp")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
