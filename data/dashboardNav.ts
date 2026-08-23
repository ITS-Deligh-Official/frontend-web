import type { LucideIcon } from "lucide-react";
import { Home, LayoutGrid, BookOpen, ClipboardList, Briefcase } from "lucide-react";
import type { Role } from "@/types/auth";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Student nav is fully built this round (see app/(dashboard)/student/*).
 * Trainer / Institution / Recruiter are scaffolded with a "coming soon"
 * placeholder page so the shell + routing is ready — build these out next,
 * role by role, same pattern as student.
 */
export const DASHBOARD_NAV: Record<Role, NavItem[]> = {
  student: [
    { label: "Home", href: "/student", icon: Home },
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutGrid },
    { label: "Learning", href: "/student/learning", icon: BookOpen },
    { label: "Assessment", href: "/student/assessment", icon: ClipboardList },
    { label: "Career", href: "/student/career", icon: Briefcase },
  ],
  trainer: [
    { label: "Home", href: "/trainer", icon: Home },
    { label: "Dashboard", href: "/trainer/dashboard", icon: LayoutGrid },
  ],
  institution: [
    { label: "Home", href: "/institution", icon: Home },
    { label: "Dashboard", href: "/institution/dashboard", icon: LayoutGrid },
  ],
  recruiter: [
    { label: "Home", href: "/recruiter", icon: Home },
    { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutGrid },
  ],
};

export const ROLE_LABEL: Record<Role, string> = {
  student: "Student",
  trainer: "Trainer",
  institution: "Institution",
  recruiter: "Recruiter",
};
