import { CarOrder } from "@/components/CarOrder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car parts",
  description: "Choose your car make and model, then the printed parts MTE makes in Riyadh.",
};

export default function ShopPage() {
  return <CarOrder />;
}
