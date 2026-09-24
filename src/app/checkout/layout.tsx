import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Confirm your MTE order in Riyadh. Pay by Mada, transfer, WhatsApp, or cash on delivery.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
