"use client";

import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { useI18n } from "@/lib/i18n";
import { mapsLink, site, whatsappLink } from "@/lib/site";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = whatsappLink(
      `${name} · ${phone}\n${message}\n\n${site.address.en}`,
    );
  }

  const field =
    "w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-laser";

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl font-semibold">{t("contact.title")}</h1>
        <p className="mt-4 text-mute">{t("contact.body")}</p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 text-laser" size={18} />
            {site.address[lang]}
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 text-laser" size={18} />
            {site.hours[lang]}
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 text-laser" size={18} />
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 text-laser" size={18} />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm text-sand underline"
        >
          {t("contact.map")}
        </a>
      </div>
      <GlowCard lift={false} className="rounded-[2rem] p-6">
        <form onSubmit={submit} className="space-y-3">
          <h2 className="font-display text-xl">{t("contact.formTitle")}</h2>
          <input className={field} required placeholder={t("quote.name")} value={name} onChange={(e) => setName(e.target.value)} />
          <input className={field} required placeholder={t("quote.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea className={`${field} min-h-32`} required placeholder={t("contact.message")} value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type="submit">{t("contact.send")}</Button>
        </form>
      </GlowCard>
    </div>
  );
}
