import { site } from "./site";
import type { CartItem } from "./cart";

export type Order = {
  id: string;
  createdAt: string;
  lang: "en" | "ar";
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    address: string;
    notes: string;
  };
  delivery: "pickup" | "riyadh" | "ksa";
  payment: "whatsapp" | "bank" | "mada" | "cod";
  items: CartItem[];
  shipping: number;
  subtotal: number;
  total: number;
};

export function createOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  const day = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `MTE-${day}-${n}`;
}

export function quoteBody(order: Order) {
  return orderMessage(order).replace(/^MTE order /, "MTE quote ");
}

export function quoteMailto(order: Order) {
  const subject = `MTE quote ${order.id}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteBody(order))}`;
}

export async function sendQuoteEmail(order: Order, photos: File[] = []) {
  const body = new FormData();
  body.append("name", order.customer.name);
  body.append("phone", order.customer.phone);
  body.append("_subject", `MTE quote ${order.id}`);
  body.append("_captcha", "false");
  body.append("_template", "box");
  body.append("message", quoteBody(order));
  for (const photo of photos) body.append("attachment", photo, photo.name);
  const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: string | boolean };
  return data.success === true || data.success === "true";
}

export function orderMessage(order: Order) {
  const lines = [
    `MTE order ${order.id}`,
    `${order.customer.name} · ${order.customer.phone}`,
    "",
    ...order.items.map((item) => {
      const options = item.options.map((o) => o.value.en).join(", ");
      return `• ${item.qty}× ${item.name.en}${options ? ` (${options})` : ""}`;
    }),
    order.customer.notes ? `\nNotes: ${order.customer.notes}` : "",
    `\nShop: ${site.address.en}`,
  ];
  return lines.filter(Boolean).join("\n");
}
