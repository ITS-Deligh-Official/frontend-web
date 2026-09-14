"use client";

import Link from "next/link";
import { Search, Bell, Menu, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardTopbar({
  onMenuClick,
  profileHref,
  notificationsHref,
  unreadCount = 0,
}: {
  onMenuClick: () => void;
  profileHref: string;
  notificationsHref: string;
  /** Pass this in from the page/layout so the shell stays role-agnostic. */
  unreadCount?: number;
}) {
  const unread = unreadCount;

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-grey-20 bg-white px-4 py-3 sm:px-6">
      <button
        aria-label="Open menu"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-primary hover:bg-grey-10 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-50" />
        <input
          type="search"
          placeholder="Search for courses, topics or any…"
          className="w-full rounded-lg border border-grey-20 bg-grey-10 py-2 pl-9 pr-3 text-sm text-primary placeholder:text-grey-50 focus:border-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary-10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Link href="#about" className="hidden text-sm font-medium text-primary hover:text-secondary sm:block">
          About us
        </Link>
        <Link
          href={notificationsHref}
          aria-label="Notifications"
          className="relative rounded-full p-2 text-primary hover:bg-grey-10"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-white" />
          )}
        </Link>
        <Link href={profileHref} aria-label="Profile">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
