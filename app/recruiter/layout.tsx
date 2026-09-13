"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { DASHBOARD_NAV } from "@/data/dashboardNav";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={DASHBOARD_NAV.recruiter}
      profileHref="/recruiter/profile"
      notificationsHref="/recruiter/notifications"
    >
      {children}
    </DashboardShell>
  );
}
