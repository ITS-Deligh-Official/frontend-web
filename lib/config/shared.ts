import type { SystemRole } from "@/types/auth";

export const PUBLIC_SIGNUP_ROLES = [
  "student",
  "trainer",
  "recruiter",
  "institution",
] as const;

export const FRONTEND_API_ENDPOINTS = Object.freeze({
  session: "/api/auth/session",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
});

const publicConfig = (name: string, value: string | undefined, developmentFallback: string) => {
  const normalized = value?.trim();
  if (normalized) return normalized;
  if (process.env.NODE_ENV === "production") throw new Error(`Missing required environment variable: ${name}`);
  return developmentFallback;
};
export const APP_CONFIG = Object.freeze({
  name: publicConfig("NEXT_PUBLIC_APP_NAME", process.env.NEXT_PUBLIC_APP_NAME, "Deligh Campus"),
  tagline: publicConfig("NEXT_PUBLIC_APP_TAGLINE", process.env.NEXT_PUBLIC_APP_TAGLINE, "Built for Smarter Education."),
  supportEmail: publicConfig("NEXT_PUBLIC_SUPPORT_EMAIL", process.env.NEXT_PUBLIC_SUPPORT_EMAIL, "support@localhost"),
});

export const ROUTES = Object.freeze({
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  completeProfile: "/complete-profile",
  admin: "/admin",
  superAdmin: "/super-admin",
  student: "/student",
  trainer: "/trainer",
  trainerDashboard: "/trainer/dashboard",
  institution: "/institution",
  recruiter: "/recruiter",
});

export const ROLE_HOME: Readonly<Record<SystemRole, string>> = Object.freeze({
  super_admin: ROUTES.superAdmin,
  admin: ROUTES.admin,
  student: ROUTES.student,
  trainer: ROUTES.trainer,
  institution: ROUTES.institution,
  recruiter: ROUTES.recruiter,
  user: ROUTES.home,
});

export const PROTECTED_ROLE_PREFIXES: Readonly<
  Record<string, readonly SystemRole[]>
> = Object.freeze({
  [ROUTES.superAdmin]: ["super_admin"],
  [ROUTES.admin]: ["admin", "super_admin"],
  [ROUTES.student]: ["student"],
  [ROUTES.trainer]: ["trainer"],
  [ROUTES.institution]: ["institution"],
  [ROUTES.recruiter]: ["recruiter"],
  [ROUTES.completeProfile]: [
    "super_admin",
    "admin",
    "student",
    "trainer",
    "institution",
    "recruiter",
    "user",
  ],
});

export function getRoleHome(role?: string): string {
  const normalized = role?.trim().toLowerCase() as SystemRole | undefined;
  return normalized && normalized in ROLE_HOME
    ? ROLE_HOME[normalized]
    : ROUTES.home;
}

export const API_ENDPOINTS = Object.freeze({
  login: "/auth/login",
  refreshSession: "/auth/refresh",
  revokeSession: "/auth/logout",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
  resendVerification: "/auth/resend-verification",
  completeProfile: "/auth/complete-profile",
  currentUser: "/users/me",
  /*
   * Admin APIs required by the approved product vision:
   * centralized governance, learner operations, quality, analytics, finance,
   * content, and settings. Spring Security must enforce every permission.
   */
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminUser: (userId: string) => `/admin/users/${encodeURIComponent(userId)}`,
  adminUserStatus: (userId: string) =>
    `/admin/users/${encodeURIComponent(userId)}/status`,
  adminUserRoles: (userId: string) =>
    `/admin/users/${encodeURIComponent(userId)}/roles`,
  adminCourses: "/admin/courses",
  adminCourse: (courseId: string) =>
    `/admin/courses/${encodeURIComponent(courseId)}`,
  adminBatches: "/admin/batches",
  adminBatch: (batchId: string) =>
    `/admin/batches/${encodeURIComponent(batchId)}`,
  adminCourseApprovals: "/admin/course-approvals",
  adminCourseApprovalDecision: (courseId: string) =>
    `/admin/course-approvals/${encodeURIComponent(courseId)}/decision`,
  adminAssessments: "/admin/assessments",
  adminAssessment: (assessmentId: string) =>
    `/admin/assessments/${encodeURIComponent(assessmentId)}`,
  adminAppeals: "/admin/appeals",
  adminAppealDecision: (appealId: string) =>
    `/admin/appeals/${encodeURIComponent(appealId)}/decision`,
  adminReports: "/admin/reports",
  adminReportExport: "/admin/reports/export",
  adminFinance: "/admin/finance",
  adminTransactions: "/admin/finance/transactions",
  adminContent: "/admin/content",
  adminContentItem: (contentId: string) =>
    `/admin/content/${encodeURIComponent(contentId)}`,
  adminSettings: "/admin/settings",

  /*
   * Super Admin APIs required for platform-wide governance:
   * organizations, RBAC, administrator provisioning, subscriptions,
   * analytics, auditability, and secure platform configuration.
   */
  superAdminDashboard: "/super-admin/dashboard",
  organizations: "/super-admin/organizations",
  organization: (organizationId: string) =>
    `/super-admin/organizations/${encodeURIComponent(organizationId)}`,
  organizationStatus: (organizationId: string) =>
    `/super-admin/organizations/${encodeURIComponent(organizationId)}/status`,
  roles: "/super-admin/roles",
  role: (roleId: string) => `/super-admin/roles/${encodeURIComponent(roleId)}`,
  permissions: "/super-admin/permissions",
  rolePermissions: (roleId: string) =>
    `/super-admin/roles/${encodeURIComponent(roleId)}/permissions`,
  platformAdmins: "/super-admin/admins",
  platformAdmin: (adminId: string) =>
    `/super-admin/admins/${encodeURIComponent(adminId)}`,
  platformAdminStatus: (adminId: string) =>
    `/super-admin/admins/${encodeURIComponent(adminId)}/status`,
  subscriptions: "/super-admin/subscriptions",
  subscription: (subscriptionId: string) =>
    `/super-admin/subscriptions/${encodeURIComponent(subscriptionId)}`,
  platformAnalytics: "/super-admin/analytics",
  systemConfiguration: "/super-admin/system-configuration",
  auditLogs: "/super-admin/audit-logs",
  platformConfiguration: "/super-admin/platform-configuration",

  /* Trainer journey from the handbook: plan → teach → mentor → assess → feedback. */
  trainerDashboard: "/trainer/dashboard",
  trainerCourses: "/trainer/courses",
  trainerCourse: (courseId: string) =>
    `/trainer/courses/${encodeURIComponent(courseId)}`,
  trainerLiveClasses: "/trainer/live-classes",
  trainerStudents: "/trainer/students",
  trainerStudent: (studentId: string) =>
    `/trainer/students/${encodeURIComponent(studentId)}`,
  trainerReports: "/trainer/reports",
  trainerReportExport: "/trainer/reports/export",
  trainerAnnouncements: "/trainer/announcements",
  trainerAttendance: "/trainer/attendance",
  trainerBatches: "/trainer/batches",
  trainerBatch: (batchId: string) =>
    `/trainer/batches/${encodeURIComponent(batchId)}`,
  trainerSessions: "/trainer/sessions",
  trainerSession: (sessionId: string) =>
    `/trainer/sessions/${encodeURIComponent(sessionId)}`,
  trainerAssessments: "/trainer/assessments",
  trainerAssessment: (assessmentId: string) =>
    `/trainer/assessments/${encodeURIComponent(assessmentId)}`,
  trainerFeedback: "/trainer/feedback",
  trainerFeedbackItem: (feedbackId: string) =>
    `/trainer/feedback/${encodeURIComponent(feedbackId)}`,
  trainerProfile: "/trainer/profile",
  trainerNotifications: "/trainer/notifications",

  /* Student journey: learning → practice → assessment → verification → career. */
  studentDashboard: "/student/dashboard",
  studentSchedule: "/student/schedule",
  studentCourses: "/student/courses",
  studentCourseDetail: (courseId: string) =>
    `/student/courses/${encodeURIComponent(courseId)}`,
  studentCourseEnroll: (courseId: string) =>
    `/student/courses/${encodeURIComponent(courseId)}/enroll`,
  studentAssessments: "/student/assessments",
  studentAssessmentDetail: (assessmentId: string) =>
    `/student/assessments/${encodeURIComponent(assessmentId)}`,
  studentAssessmentStart: (assessmentId: string) =>
    `/student/assessments/${encodeURIComponent(assessmentId)}/start`,
  studentAssessmentSubmit: (assessmentId: string) =>
    `/student/assessments/${encodeURIComponent(assessmentId)}/submit`,
  studentCareer: "/student/career",
  studentNotifications: "/student/notifications",
  studentNotificationRead: (id: string) =>
    `/student/notifications/${encodeURIComponent(id)}/read`,
  studentNotificationDelete: (id: string) =>
    `/student/notifications/${encodeURIComponent(id)}`,
  studentProfile: "/student/profile",
});
