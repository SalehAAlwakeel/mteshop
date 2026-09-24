"use client";

import { useI18n } from "@/lib/i18n";
import { mapsEmbed, mapsLink, site } from "@/lib/site";

export function OfficeMap() {
  const { t, lang } = useI18n();
  const src = mapsEmbed(lang);

  return (
    <section className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("contact.office")}</p>
        <h2 className="font-display mt-3 text-3xl font-semibold">{site.city[lang]}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 break-words text-mute">{site.address[lang]}</p>
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-line">
          <iframe
            title={t("contact.office")}
            src={src}
            className="h-[380px] w-full border-0 grayscale-[0.15] sm:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm text-sand underline"
        >
          {t("contact.map")}
        </a>
      </div>
    </section>
  );
}
