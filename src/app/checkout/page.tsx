"use client";

import { Button } from "@/components/Button";
import { cartSubtotal, useCart } from "@/lib/cart";
import { formatSar, shippingCost, vatBreakdown } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { createOrderId, quoteMailto, type Order } from "@/lib/orders";
import { site } from "@/lib/site";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const saudiPhone = /^(05|5|\+9665|9665)\d{8}$/;

export default function CheckoutPage() {
  const { t, lang } = useI18n();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const router = useRouter();
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState<Order["delivery"]>("riyadh");
  const [payment, setPayment] = useState<Order["payment"]>("whatsapp");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: lang === "ar" ? "الرياض" : "Riyadh",
    district: "",
    address: "",
    notes: "",
  });

  const subtotal = cartSubtotal(items);
  const shipping = shippingCost(delivery, subtotal);
  const total = subtotal + shipping;
  const vat = useMemo(() => vatBreakdown(subtotal).vat, [subtotal]);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

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
      customer: { ...form, phone },
      delivery,
      payment,
      items,
      shipping,
      subtotal,
      total,
    };
    window.localStorage.setItem("mte-last-order", JSON.stringify(order));
    const existing = JSON.parse(window.localStorage.getItem("mte-orders") || "[]") as Order[];
    window.localStorage.setItem("mte-orders", JSON.stringify([order, ...existing].slice(0, 20)));
    const mail = document.createElement("a");
    mail.href = quoteMailto(order);
    mail.click();
    clear();
    router.push(`/checkout/success?id=${order.id}`);
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
          <input className={field} placeholder={t("checkout.name")} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          <input className={field} placeholder={t("checkout.phone")} value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
          <input className={field} type="email" placeholder={t("checkout.email")} value={form.email} onChange={(e) => set("email", e.target.value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={field} placeholder={t("checkout.city")} value={form.city} onChange={(e) => set("city", e.target.value)} />
            <input className={field} placeholder={t("checkout.district")} value={form.district} onChange={(e) => set("district", e.target.value)} />
          </div>
          <textarea className={`${field} min-h-20`} placeholder={t("checkout.address")} value={form.address} onChange={(e) => set("address", e.target.value)} />
          <textarea className={`${field} min-h-20`} placeholder={t("checkout.notes")} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">{t("checkout.delivery")}</legend>
          <div className="grid gap-2">
            {(
              [
                ["pickup", "checkout.pickup", 0],
                ["riyadh", "checkout.riyadh", site.shipping.riyadh],
                ["ksa", "checkout.ksa", site.shipping.ksa],
              ] as const
            ).map(([id, label, price]) => (
              <label key={id} className="flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-2xl border border-line px-4 py-3 text-sm has-[:checked]:border-laser">
                <span className="flex min-w-0 items-center gap-3">
                  <input type="radio" name="delivery" checked={delivery === id} onChange={() => setDelivery(id)} />
                  {t(label)}
                </span>
                <span className="text-mute">
                  {id !== "pickup" && subtotal >= site.shipping.freeFrom
                    ? t("checkout.free")
                    : formatSar(price, lang)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">{t("checkout.payment")}</legend>
          <div className="grid gap-2">
            {(
              [
                ["whatsapp", "checkout.whatsappPay"],
                ["mada", "checkout.mada"],
                ["bank", "checkout.bank"],
                ["cod", "checkout.cod"],
              ] as const
            ).map(([id, label]) => (
              <label key={id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 py-3 text-sm has-[:checked]:border-laser">
                <input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)} />
                {t(label)}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-sm text-ember">{error}</p>}
        <Button type="submit">{t("checkout.place")}</Button>
      </form>

      <aside className="h-fit rounded-3xl border border-line bg-panel p-6">
        <h2 className="font-display text-xl">{t("checkout.summary")}</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>
                {item.qty}× {item.name[lang]}
              </span>
              <span>{formatSar(item.unitPrice * item.qty, lang)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <p className="flex justify-between">
            <span>{t("cart.subtotal")}</span>
            <span>{formatSar(subtotal, lang)}</span>
          </p>
          <p className="flex justify-between text-mute">
            <span>{t("checkout.vat")}</span>
            <span>{formatSar(Math.round(vat), lang)}</span>
          </p>
          <p className="flex justify-between">
            <span>{t("checkout.shipping")}</span>
            <span>{formatSar(shipping, lang)}</span>
          </p>
          <p className="flex justify-between text-lg font-semibold text-laser">
            <span>{t("checkout.total")}</span>
            <span>{formatSar(total, lang)}</span>
          </p>
        </div>
      </aside>
    </div>
  );
}
