import { PartView } from "@/components/PartView";
import { getProduct, products } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Part" };
  return { title: product.name.en, description: product.short.en };
}

export default async function PartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProduct(slug)) notFound();
  return <PartView slug={slug} />;
}
