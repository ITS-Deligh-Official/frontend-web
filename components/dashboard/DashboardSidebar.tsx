"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import BrandLogo from "@/components/auth/BrandLogo";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/data/dashboardNav";

export default function DashboardSidebar({
  items,
  label,
  eyebrow,
  open,
  onClose,
}: {
  items: readonly NavItem[];
  label?: string;
  eyebrow?: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === items[0]?.href
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-primary-100/45 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        aria-label={`${label ?? "Dashboard"} navigation`}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col bg-primary px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between px-2">
          <div>
            <BrandLogo
              variant="full"
              theme="dark"
              size={34}
              href={items[0]?.href ?? "/"}
            />
            {label && (
              <div className="mt-5 border-l-2 border-secondary-40 pl-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  {eyebrow}
                </p>
                <p className="mt-0.5 font-display text-sm font-semibold text-white">
                  {label}
                </p>
              </div>
            )}
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="scrollbar-thin mt-7 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/72 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <p className="px-3 pt-4 text-[10px] leading-relaxed text-white/40">
          Access is permission-aware. The API remains the authorization
          authority.
        </p>
      </aside>
    </>
  );
}
