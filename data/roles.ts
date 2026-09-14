import type { LucideIcon } from "lucide-react";
import { GraduationCap, Presentation, Briefcase, Landmark } from "lucide-react";
import type { Role } from "@/types/auth";

export interface RoleOption {
  id: Role;
  label: string;
  icon: LucideIcon;
}

export const ROLES: RoleOption[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "trainer", label: "Trainer", icon: Presentation },
  { id: "recruiter", label: "Recruiter", icon: Briefcase },
  { id: "institution", label: "Institution", icon: Landmark },
];
