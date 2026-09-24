"use client";

import { cn } from "@/lib/cn";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

export function GlowCard({
  children,
  className,
  href,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  lift?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(61,255,210,0.2), transparent 58%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  const hover = reduce || !lift ? undefined : { y: -8, scale: 1.02 };
  const tap = reduce || !lift ? undefined : { scale: 0.985 };

  const frame = cn(
    "group relative isolate block h-full overflow-hidden rounded-3xl border border-line bg-panel transition-[border-color,box-shadow] duration-300 hover:border-laser/40 hover:shadow-[0_18px_50px_rgba(61,255,210,0.12)]",
    className,
  );

  const body = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span className="relative z-20 flex h-full flex-col">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div className="h-full" whileHover={hover} whileTap={tap} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
        <Link href={href} className={frame} onMouseMove={onMove}>
          {body}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div className={frame} onMouseMove={onMove} whileHover={hover} whileTap={tap} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
      {body}
    </motion.div>
  );
}
