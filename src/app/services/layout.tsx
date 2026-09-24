import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "3D printing, carbon fiber parts, and laser cutting & engraving from MTE in Riyadh, Saudi Arabia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
