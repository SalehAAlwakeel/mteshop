"use client";

import { Logo } from "@/components/Logo";
import { useCart, cartCount } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/shop", key: "nav.shop" as const },
  { href: "/services", key: "nav.services" as const },
  { href: "/quote", key: "nav.quote" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
];

export function Header() {
  const { t, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const count = useCart((s) => cartCount(s.items));
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const badge = ready ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:h-[4.5rem] sm:gap-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-auto max-w-[5.25rem] sm:h-11 sm:max-w-none" priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href={link.href}
                className={cn(
                  "block rounded-full px-3 py-1.5 text-sm text-mute transition hover:bg-wash hover:text-paper",
                  pathname === link.href && "bg-wash text-paper",
                )}
              >
                {t(link.key)}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-laser/40"
            aria-label={theme === "dark" ? t("common.themeLight") : t("common.themeDark")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.button
            type="button"
            onClick={toggleLang}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-10 place-items-center rounded-full border border-line px-2.5 text-xs font-medium text-sand hover:border-sand/50 sm:px-3"
          >
            {t("common.language")}
          </motion.button>
          <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line hover:border-laser/40"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag size={18} />
              {badge > 0 && (
                <span className="absolute -top-1 -end-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[10px] font-bold">
                  {badge}
                </span>
              )}
            </Link>
          </motion.div>
          <motion.button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label={t("common.openMenu")}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col px-3 py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base text-paper"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
