"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { DASHBOARD_NAV } from "@/data/dashboardNav";

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      navItems={DASHBOARD_NAV.institution}
      profileHref="/institution/profile"
      notificationsHref="/institution/notifications"
    >
      {children}
    </DashboardShell>
  );
}
