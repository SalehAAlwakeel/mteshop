import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/shop", "/services", "/quote", "/about", "/contact", "/privacy", "/terms"];
  const productPaths = products.map((p) => `/shop/${p.slug}`);
  return [...paths, ...productPaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/shop/") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
  }));
}
