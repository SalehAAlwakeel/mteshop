"use client";

import { Button } from "@/components/Button";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { createOrderId, quoteMailto, sendQuoteEmail, type Order } from "@/lib/orders";
import { useRouter } from "next/navigation";
import { useState } from "react";

const saudiPhone = /^(05|5|\+9665|9665)\d{8}$/;

export default function CheckoutPage() {
  const { t, lang } = useI18n();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const phone = form.phone.replaceAll(" ", "");
    if (!form.name.trim() || !saudiPhone.test(phone)) {
      setError(t("checkout.required"));
      return;
    }
    const order: Order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      lang,
      customer: {
        name: form.name.trim(),
        phone,
        email: "",
        city: "",
        district: "",
        address: "",
        notes: "",
      },
      delivery: "pickup",
      payment: "whatsapp",
      items,
      shipping: 0,
      subtotal: 0,
      total: 0,
    };
    window.localStorage.setItem("mte-last-order", JSON.stringify(order));
    const existing = JSON.parse(window.localStorage.getItem("mte-orders") || "[]") as Order[];
    window.localStorage.setItem("mte-orders", JSON.stringify([order, ...existing].slice(0, 20)));
    setSending(true);
    void sendQuoteEmail(order)
      .then((sent) => {
        if (!sent) {
          const mail = document.createElement("a");
          mail.href = quoteMailto(order);
          mail.click();
        }
        clear();
        router.push(`/checkout/success?id=${order.id}&sent=${sent ? "email" : "mailapp"}`);
      })
      .catch(() => {
        const mail = document.createElement("a");
        mail.href = quoteMailto(order);
        mail.click();
        clear();
        router.push(`/checkout/success?id=${order.id}&sent=mailapp`);
      });
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">{t("checkout.title")}</h1>
        <Button href="/shop" className="mt-8">
          {t("cart.shop")}
        </Button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-laser";

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-semibold">{t("checkout.title")}</h1>
          <p className="mt-3 text-mute">{t("checkout.body")}</p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">{t("checkout.details")}</legend>
          <input className={field} placeholder={t("checkout.name")} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <input className={field} placeholder={t("checkout.phone")} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required />
        </fieldset>

        {error && <p className="text-sm text-ember">{error}</p>}
        <Button type="submit" disabled={sending}>
          {t("checkout.place")}
        </Button>
      </form>

      <aside className="h-fit rounded-3xl border border-line bg-panel p-6">
        <h2 className="font-display text-xl">{t("checkout.summary")}</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              {item.qty}× {item.name[lang]}
              {item.options.length > 0 && (
                <span className="mt-1 block text-mute">
                  {item.options.map((o) => o.value[lang]).join(" · ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
