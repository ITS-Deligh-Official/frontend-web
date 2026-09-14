import type { LucideIcon } from "lucide-react";
import {
  Home,
  LayoutGrid,
  BookOpen,
  ClipboardList,
  Briefcase,
} from "lucide-react";

export type DashboardRole =
  | "student"
  | "trainer"
  | "institution"
  | "recruiter";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Student nav is fully built this round.
 * Trainer / Institution / Recruiter dashboards are scaffolded.
 */
export const DASHBOARD_NAV: Record<DashboardRole, NavItem[]> = {
  student: [
    { label: "Home", href: "/student", icon: Home },
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutGrid },
    { label: "Learning", href: "/student/learning", icon: BookOpen },
    {
      label: "Assessment",
      href: "/student/assessment",
      icon: ClipboardList,
    },
    { label: "Career", href: "/student/career", icon: Briefcase },
  ],

  trainer: [
    { label: "Home", href: "/trainer", icon: Home },
    { label: "Dashboard", href: "/trainer/dashboard", icon: LayoutGrid },
  ],

  institution: [
    { label: "Home", href: "/institution", icon: Home },
    {
      label: "Dashboard",
      href: "/institution/dashboard",
      icon: LayoutGrid,
    },
  ],

  recruiter: [
    { label: "Home", href: "/recruiter", icon: Home },
    {
      label: "Dashboard",
      href: "/recruiter/dashboard",
      icon: LayoutGrid,
    },
  ],
};

export const ROLE_LABEL: Record<DashboardRole, string> = {
  student: "Student",
  trainer: "Trainer",
  institution: "Institution",
  recruiter: "Recruiter",
};