export const APP_NAME = "Deligh Campus";
export const APP_TAGLINE = "Built for Smarter Education.";

export const AUTH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "its_deligh_token";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const ROUTES = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  completeProfile: "/complete-profile",
} as const;

/**
 * Each role gets its own top-level route (/student, /trainer, /institution,
 * /recruiter) rather than a shared /dashboard, since each role's nav and
 * pages are completely different. Use this after login/signup to send the
 * user to the right place.
 */
export const ROLE_HOME: Record<import("@/types/auth").Role, string> = {
  student: "/student",
  trainer: "/trainer",
  institution: "/institution",
  recruiter: "/recruiter",
};

export const API_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
  // POST /api/auth/resend-verification — body: { email } — used on the
  // "check your inbox" screen when the original link expired or got lost.
  resendVerification: "/auth/resend-verification",
  completeProfile: "/auth/complete-profile",
  currentUser: "/users/me",

  // ── Student — Dashboard ──────────────────────────────────────────────
  // GET  /api/student/dashboard
  //   Returns: { welcomeName, weekProgressPercent, topPerformers[], rankList[], summaryCards[] }
  //   Used on: /student/dashboard (the main "Welcome back" screen)
  studentDashboard: "/student/dashboard",

  // ── Student — Learning / Courses ─────────────────────────────────────
  // GET  /api/student/courses?category=&search=
  //   Returns: list of courses the student can browse/enroll in
  studentCourses: "/student/courses",
  // GET  /api/student/courses/{courseId}
  //   Returns: single course detail (what you'll learn, chapters, rating…)
  studentCourseDetail: (courseId: string) => `/student/courses/${courseId}`,
  // POST /api/student/courses/{courseId}/enroll
  //   Body: {}  Returns: { enrolled: true, courseId }
  studentCourseEnroll: (courseId: string) => `/student/courses/${courseId}/enroll`,

  // ── Student — Assessments ────────────────────────────────────────────
  // GET  /api/student/assessments?status=all|upcoming|in_progress|completed
  //   Returns: list of assessments assigned to this student
  studentAssessments: "/student/assessments",
  // GET  /api/student/assessments/{assessmentId}
  //   Returns: assessment overview — sections, question counts, time left,
  //   per-skill coverage percentages (used for the progress bars)
  studentAssessmentDetail: (assessmentId: string) => `/student/assessments/${assessmentId}`,
  // POST /api/student/assessments/{assessmentId}/start
  //   Returns: { attemptId } — call this before showing the first question
  studentAssessmentStart: (assessmentId: string) => `/student/assessments/${assessmentId}/start`,
  // POST /api/student/assessments/{assessmentId}/submit
  //   Body: multipart/form-data — file: <uploaded work>, comments: string
  studentAssessmentSubmit: (assessmentId: string) => `/student/assessments/${assessmentId}/submit`,

  // ── Student — Career ──────────────────────────────────────────────────
  // GET  /api/student/career
  //   Returns: { readinessPercent, skill: {done,total}, experience: {done,total},
  //              certificates: {done,total}, goals: {done,total} }
  studentCareer: "/student/career",

  // ── Student — Notifications ───────────────────────────────────────────
  // GET  /api/student/notifications
  //   Returns: list of notifications, newest first
  studentNotifications: "/student/notifications",
  // PATCH /api/student/notifications/{id}/read
  //   Marks a single notification as read
  studentNotificationRead: (id: string) => `/student/notifications/${id}/read`,
  // DELETE /api/student/notifications/{id}
  studentNotificationDelete: (id: string) => `/student/notifications/${id}`,

  // ── Student — Profile ──────────────────────────────────────────────────
  // GET  /api/student/profile        → full profile incl. bio, skills
  // PUT  /api/student/profile        → update profile fields
  studentProfile: "/student/profile",
} as const;
