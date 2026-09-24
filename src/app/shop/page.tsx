import { ShopCatalog } from "@/components/ShopCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy 3D printed parts, carbon fiber pieces, and laser-cut or engraved work from MTE in Riyadh. Prices in SAR, VAT included.",
};

export default function ShopPage() {
  return <ShopCatalog />;
}
