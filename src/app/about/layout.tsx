import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "MTE is a fabrication studio in Al Mursalat, Riyadh for 3D printing, carbon fiber, and laser work.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
