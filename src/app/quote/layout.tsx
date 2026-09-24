import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Send an STL, DXF, or SVG to MTE in Riyadh for a SAR quote on 3D printing, carbon fiber, or laser work.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
