import Image from "next/image";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

export default function BrandLogo({
  variant = "dark",
  size = 44,
  className,
}: {
  variant?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative shrink-0 overflow-hidden rounded-xl" style={{ height: size, width: size }}>
        <Image src="/logo/logo.png" alt={`${APP_NAME} logo`} fill className="object-cover" sizes={`${size}px`} priority />
      </div>
      <div>
        <p className={cn("text-lg font-bold leading-tight tracking-tight", variant === "dark" ? "text-white" : "text-slate-900")}>
          ITS DELIGH
        </p>
        <p className={cn("text-[11px]", variant === "dark" ? "text-white/60" : "text-slate-500")}>
          Verified Employability Platform
        </p>
      </div>
    </div>
  );
}
