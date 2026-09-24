"use client";

import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function WhatsAppButton() {
  const { t, lang } = useI18n();
  const text =
    lang === "ar"
      ? "مرحباً MTE، أريد الاستفسار عن التصنيع في الرياض."
      : "Hello MTE, I would like to ask about fabrication in Riyadh.";

  return (
    <motion.a
      href={whatsappLink(text)}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.94 }}
      aria-label={t("common.whatsapp")}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-[max(1rem,env(safe-area-inset-inline-end))] z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-sm font-semibold text-ink shadow-[0_10px_40px_rgba(37,211,102,0.35)] sm:px-4 sm:py-3"
    >
      <span className="relative grid h-6 w-6 place-items-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-white/40" />
        <MessageCircle size={18} />
      </span>
      <span className="hidden sm:inline">{t("common.whatsapp")}</span>
    </motion.a>
  );
}
