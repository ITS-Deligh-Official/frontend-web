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

export const APP_CONFIG = Object.freeze({
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Deligh Campus",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE ?? "Built for Smarter Education.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
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
  studentDashboard: "/student/dashboard",
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
  signup: "/v1/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/v1/auth/verify-email",
  resendVerification: "/v1/auth/resend-verification",
  completeProfile: "/v1/auth/complete-profile",
  currentUser: "/users/me",

  // Admin APIs
  adminDashboard: "/v1/admin/dashboard",
  adminUsers: "/v1/admin/users",
  adminUser: (userId: string) =>
    `/v1/admin/users/${encodeURIComponent(userId)}`,
  adminUserStatus: (userId: string) =>
    `/v1/admin/users/${encodeURIComponent(userId)}/status`,
  adminUserRoles: (userId: string) =>
    `/v1/admin/users/${encodeURIComponent(userId)}/roles`,
  adminCourses: "/v1/admin/courses",
  adminCourse: (courseId: string) =>
    `/v1/admin/courses/${encodeURIComponent(courseId)}`,
  adminBatches: "/v1/admin/batches",
  adminBatch: (batchId: string) =>
    `/v1/admin/batches/${encodeURIComponent(batchId)}`,
  adminCourseApprovals: "/v1/admin/course-approvals",
  adminCourseApprovalDecision: (courseId: string) =>
    `/v1/admin/course-approvals/${encodeURIComponent(courseId)}/decision`,
  adminAssessments: "/v1/admin/assessments",
  adminAssessment: (assessmentId: string) =>
    `/v1/admin/assessments/${encodeURIComponent(assessmentId)}`,
  adminAppeals: "/v1/admin/appeals",
  adminAppealDecision: (appealId: string) =>
    `/v1/admin/appeals/${encodeURIComponent(appealId)}/decision`,
  adminReports: "/v1/admin/reports",
  adminReportExport: "/v1/admin/reports/export",
  adminFinance: "/v1/admin/finance",
  adminTransactions: "/v1/admin/finance/transactions",
  adminContent: "/v1/admin/content",
  adminContentItem: (contentId: string) =>
    `/v1/admin/content/${encodeURIComponent(contentId)}`,
  adminSettings: "/v1/admin/settings",

  // Super Admin APIs
  superAdminDashboard: "/v1/super-admin/dashboard",
  organizations: "/v1/super-admin/organizations",
  organization: (organizationId: string) =>
    `/v1/super-admin/organizations/${encodeURIComponent(organizationId)}`,
  organizationStatus: (organizationId: string) =>
    `/v1/super-admin/organizations/${encodeURIComponent(organizationId)}/status`,
  roles: "/v1/super-admin/roles",
  role: (roleId: string) =>
    `/v1/super-admin/roles/${encodeURIComponent(roleId)}`,
  permissions: "/v1/super-admin/permissions",
  rolePermissions: (roleId: string) =>
    `/v1/super-admin/roles/${encodeURIComponent(roleId)}/permissions`,
  platformAdmins: "/v1/super-admin/admins",
  platformAdmin: (adminId: string) =>
    `/v1/super-admin/admins/${encodeURIComponent(adminId)}`,
  platformAdminStatus: (adminId: string) =>
    `/v1/super-admin/admins/${encodeURIComponent(adminId)}/status`,
  subscriptions: "/v1/super-admin/subscriptions",
  subscription: (subscriptionId: string) =>
    `/v1/super-admin/subscriptions/${encodeURIComponent(subscriptionId)}`,
  platformAnalytics: "/v1/super-admin/analytics",
  systemConfiguration: "/v1/super-admin/system-configuration",
  auditLogs: "/v1/super-admin/audit-logs",
  platformConfiguration: "/v1/super-admin/platform-configuration",

  // Trainer APIs
  trainerDashboard: "/v1/trainer/dashboard",
  trainerCourses: "/v1/trainer/courses",
  trainerCourse: (courseId: string) =>
    `/v1/trainer/courses/${encodeURIComponent(courseId)}`,
  trainerLiveClasses: "/v1/trainer/live-classes",
  trainerStudents: "/v1/trainer/students",
  trainerStudent: (studentId: string) =>
    `/v1/trainer/students/${encodeURIComponent(studentId)}`,
  trainerReports: "/v1/trainer/reports",
  trainerReportExport: "/v1/trainer/reports/export",
  trainerAnnouncements: "/v1/trainer/announcements",
  trainerAttendance: "/v1/trainer/attendance",
  trainerBatches: "/v1/trainer/batches",
  trainerBatch: (batchId: string) =>
    `/v1/trainer/batches/${encodeURIComponent(batchId)}`,
  trainerSessions: "/v1/trainer/sessions",
  trainerSession: (sessionId: string) =>
    `/v1/trainer/sessions/${encodeURIComponent(sessionId)}`,
  trainerLearners: "/v1/trainer/learners",
  trainerLearner: (learnerId: string) =>
    `/v1/trainer/learners/${encodeURIComponent(learnerId)}`,
  trainerAssessments: "/v1/trainer/assessments",
  trainerAssessment: (assessmentId: string) =>
    `/v1/trainer/assessments/${encodeURIComponent(assessmentId)}`,
  trainerFeedback: "/v1/trainer/feedback",
  trainerFeedbackItem: (feedbackId: string) =>
    `/v1/trainer/feedback/${encodeURIComponent(feedbackId)}`,
  trainerProfile: "/v1/trainer/profile",
  trainerNotifications: "/v1/trainer/notifications",

  // Student APIs
  studentDashboard: "/v1/student/dashboard",
  studentSchedule: "/v1/student/schedule",
  studentCourses: "/v1/student/courses",
  studentCourseDetail: (courseId: string) =>
    `/v1/student/courses/${encodeURIComponent(courseId)}`,
  studentCourseEnroll: (courseId: string) =>
    `/v1/student/courses/${encodeURIComponent(courseId)}/enroll`,
  studentAssessments: "/v1/student/assessments",
  studentAssessmentDetail: (assessmentId: string) =>
    `/v1/student/assessments/${encodeURIComponent(assessmentId)}`,
  studentAssessmentStart: (assessmentId: string) =>
    `/v1/student/assessments/${encodeURIComponent(assessmentId)}/start`,
  studentAssessmentSubmit: (assessmentId: string) =>
    `/v1/student/assessments/${encodeURIComponent(assessmentId)}/submit`,
  studentCareer: "/v1/student/career",
  studentNotifications: "/v1/student/notifications",
  studentNotificationRead: (id: string) =>
    `/v1/student/notifications/${encodeURIComponent(id)}/read`,
  studentNotificationDelete: (id: string) =>
    `/v1/student/notifications/${encodeURIComponent(id)}`,
  studentProfile: "/v1/student/profile",
});