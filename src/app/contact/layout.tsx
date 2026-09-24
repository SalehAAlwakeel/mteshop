import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "WhatsApp, visit, or email MTE in Riyadh for 3D printing, carbon fiber, and laser fabrication.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
