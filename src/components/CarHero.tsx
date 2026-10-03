"use client";

import dynamic from "next/dynamic";

const AeroShowcase = dynamic(() => import("@/components/AeroShowcase").then((mod) => mod.AeroShowcase), {
  ssr: false,
  loading: () => <div className="h-[520vh] bg-[#050505] md:h-[640vh]" />,
});

export function CarHero() {
  return <AeroShowcase />;
}
