import type { Category } from "@/lib/products";
import Image from "next/image";

export function ProductVisual({
  seed,
  className = "",
  alt = "",
  priority = false,
}: {
  category?: Category | string;
  seed: string;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      <Image
        src={`/products/${seed}.png`}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-black/10" />
    </div>
  );
}
