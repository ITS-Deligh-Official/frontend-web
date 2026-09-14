"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { DASHBOARD_NAV } from "@/data/dashboardNav";

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      navItems={DASHBOARD_NAV.trainer}
      profileHref="/trainer/profile"
      notificationsHref="/trainer/notifications"
    >
      {children}
    </DashboardShell>
  );
}
