export const APP_NAME = "ITS Deligh";
export const APP_TAGLINE = "Learn. Assess. Get Verified. Get Hired.";

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
  dashboard: "/dashboard",
} as const;

export const API_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
  completeProfile: "/auth/complete-profile",
  currentUser: "/users/me",
} as const;
