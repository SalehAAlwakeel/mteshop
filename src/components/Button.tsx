"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary:
    "bg-laser text-ink hover:bg-laser-2 shadow-[0_0_32px_rgba(61,255,210,0.25)]",
  ember: "bg-ember text-white hover:brightness-110 shadow-[0_0_28px_rgba(255,90,42,0.28)]",
  ghost:
    "border border-line bg-wash text-paper hover:border-laser/50",
  sand: "bg-sand text-ink hover:brightness-105",
};

const MotionLink = motion.create(Link);

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: keyof typeof styles;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const cls = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide",
    styles[variant],
    className,
  );
  const anim = reduce
    ? {}
    : {
        whileHover: { scale: 1.06, y: -3 },
        whileTap: { scale: 0.94, y: 0 },
        transition: { type: "spring" as const, stiffness: 460, damping: 24 },
      };

  if (href) {
    return (
      <MotionLink href={href} className={cls} {...anim}>
        <span className="pointer-events-none absolute inset-0 btn-sheen" />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} className={cls} {...anim} {...props}>
      <span className="pointer-events-none absolute inset-0 btn-sheen" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
