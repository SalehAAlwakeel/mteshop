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

export function quoteMailto(order: Order) {
  const subject = `MTE quote ${order.id}`;
  const body = orderMessage(order).replace(/^MTE order /, "MTE quote ");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function orderMessage(order: Order) {
  const lines = [
    `MTE order ${order.id}`,
    `${order.customer.name} · ${order.customer.phone}`,
    order.customer.email,
    `${order.delivery} · ${order.payment}`,
    order.customer.city + (order.customer.district ? ` · ${order.customer.district}` : ""),
    order.customer.address,
    "",
    ...order.items.map(
      (item) =>
        `• ${item.qty}× ${item.name.en} — ${item.unitPrice} SAR` +
        (item.options.length
          ? ` (${item.options.map((o) => o.value.en).join(", ")})`
          : ""),
    ),
    "",
    `Subtotal ${order.subtotal} SAR (incl. VAT)`,
    `Shipping ${order.shipping} SAR`,
    `Total ${order.total} SAR`,
    order.customer.notes ? `\nNotes: ${order.customer.notes}` : "",
    `\nShop: ${site.address.en}`,
  ];
  return lines.filter(Boolean).join("\n");
}
