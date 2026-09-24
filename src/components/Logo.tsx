import { cn } from "@/lib/cn";
import Image from "next/image";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="MTE — Mechatronics Tech Engineering"
      width={1024}
      height={512}
      priority={priority}
      placeholder="empty"
      className={cn("logo-mark h-10 w-auto bg-transparent", className)}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
