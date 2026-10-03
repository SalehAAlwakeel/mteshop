"use client";

import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-14 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-mute">{t("footer.blurb")}</p>
          <p className="mt-4 text-sm break-words text-sand">{site.address[lang]}</p>
          <p className="mt-1 text-sm text-mute">{site.hours[lang]}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">{t("footer.shop")}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/shop" className="hover:text-laser">
              {t("nav.shop")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">{t("footer.company")}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/about" className="hover:text-laser">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="hover:text-laser">
              {t("nav.contact")}
            </Link>
            <Link href="/privacy" className="hover:text-laser">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-laser">
              {t("footer.terms")}
            </Link>
            <a href={`mailto:${site.email}`} className="hover:text-laser">
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-xs break-words text-mute">
        © {year} {site.legalName}. {t("footer.rights")}
      </div>
    </footer>
  );
}
