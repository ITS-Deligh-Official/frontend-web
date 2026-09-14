"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/auth/BrandLogo";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/data/dashboardNav";

export default function DashboardSidebar({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === items[0].href ? pathname === href : pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-primary-100/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-primary px-4 py-6 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-2">
          <BrandLogo variant="full" theme="dark" size={34} href={items[0]?.href ?? "/"} />
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-white text-primary" : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
