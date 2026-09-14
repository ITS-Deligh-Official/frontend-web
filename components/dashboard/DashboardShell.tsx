"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import type { NavItem } from "@/data/dashboardNav";

export default function DashboardShell({
  navItems,
  profileHref,
  notificationsHref,
  unreadCount,
  children,
}: {
  navItems: NavItem[];
  profileHref: string;
  notificationsHref: string;
  unreadCount?: number;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-grey-10/40">
      <DashboardSidebar items={navItems} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          onMenuClick={() => setSidebarOpen(true)}
          profileHref={profileHref}
          notificationsHref={notificationsHref}
          unreadCount={unreadCount}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
