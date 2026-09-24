"use client";

import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { useI18n } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { useState } from "react";

const services = [
  { id: "3d-printing", en: "3D printing", ar: "طباعة ثلاثية الأبعاد" },
  { id: "carbon-fiber", en: "Carbon fiber", ar: "ألياف الكربون" },
  { id: "laser", en: "Laser cut / engrave", ar: "قص / حفر ليزر" },
  { id: "mix", en: "More than one process", ar: "أكثر من عملية" },
];

export default function QuotePage() {
  const { t, lang } = useI18n();
  const [files, setFiles] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "3d-printing",
    material: "",
    qty: "1",
    deadline: "",
    details: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const serviceLabel = services.find((s) => s.id === form.service)?.en ?? form.service;
    const message = [
      `MTE quote request`,
      `${form.name} · ${form.phone}`,
      `Service: ${serviceLabel}`,
      `Material: ${form.material || "-"}`,
      `Qty: ${form.qty}`,
      form.deadline ? `Deadline: ${form.deadline}` : "",
      form.details,
      files.length ? `Files: ${files.join(", ")}` : "No files named — will send on WhatsApp",
      "",
      site.address.en,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = whatsappLink(message, lang);
  }

  const field =
    "w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-laser";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-laser">{t("quote.kicker")}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{t("quote.title")}</h1>
      <p className="mt-4 text-mute">{t("quote.body")}</p>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <input className={field} required placeholder={t("quote.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={field} required placeholder={t("quote.phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <label className="block text-sm">
          {t("quote.service")}
          <select
            className={`${field} mt-2`}
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s[lang]}
              </option>
            ))}
          </select>
        </label>
        <input className={field} placeholder={t("quote.material")} value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={field} placeholder={t("quote.qty")} value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
          <input className={field} type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
        </div>
        <textarea className={`${field} min-h-32`} required placeholder={t("quote.details")} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
        <GlowCard className="rounded-3xl border-dashed px-4 py-8 text-center">
          <label className="block cursor-pointer text-sm text-mute">
            {t("quote.drop")}
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
            {files.length > 0 && <p className="mt-3 text-sand">{files.join(" · ")}</p>}
          </label>
        </GlowCard>
        <Button type="submit">{t("quote.send")}</Button>
      </form>
    </div>
  );
}
