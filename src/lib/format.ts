import { site } from "./site";

export function formatSar(amount: number, locale: "en" | "ar" = "en") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function vatBreakdown(gross: number) {
  const net = gross / (1 + site.vatRate);
  const vat = gross - net;
  return { net, vat, gross };
}

export function shippingCost(method: "pickup" | "riyadh" | "ksa", subtotal: number) {
  if (method === "pickup") return 0;
  if (subtotal >= site.shipping.freeFrom) return 0;
  return method === "riyadh" ? site.shipping.riyadh : site.shipping.ksa;
}

export function optionKey(options?: Record<string, string>) {
  if (!options) return "";
  return Object.entries(options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
}
