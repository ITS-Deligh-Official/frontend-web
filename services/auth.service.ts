import { post } from "./api";
import { API_ENDPOINTS } from "@/lib/constants";

import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  BackendLoginResponse,
  SystemRole,
} from "@/types/auth";

/**
 * Converts backend roles into frontend-friendly role values.
 *
 * IMPORTANT:
 * Unknown roles are preserved automatically so that future
 * backend roles do not break the login system.
 */
function normalizeRole(role: string): SystemRole {
  const normalized = role.trim().toLowerCase();

  const validRoles: SystemRole[] = [
    "super_admin",
    "admin",
    "student",
    "trainer",
    "recruiter",
    "institution",
    "user",
  ];

  if (validRoles.includes(normalized as SystemRole)) {
    return normalized as SystemRole;
  }

  return "user";
}

/**
 * Determines the user's primary role.
 *
 * Priority:
 * SUPER_ADMIN
 * ADMIN
 * Other roles
 */
function getPrimaryRole(roles: string[]): SystemRole {
  const normalizedRoles = roles.map(normalizeRole);

  if (normalizedRoles.includes("super_admin")) {
    return "super_admin";
  }

  if (normalizedRoles.includes("admin")) {
    return "admin";
  }

  return normalizedRoles[0] || "user";
}

export const authService = {
  login: async (
    payload: LoginPayload
  ): Promise<AuthResponse> => {

    const response = await post<BackendLoginResponse>(
      API_ENDPOINTS.login,
      {
        email: payload.email,
        password: payload.password,
      }
    );

    const roles = Array.isArray(response.roles)
      ? response.roles.map(normalizeRole)
      : [];

    return {
      token: response.accessToken,

      user: {
        id: response.userId,
        fullName: response.fullName,
        email: response.email,

        /**
         * Primary role for routing.
         */
        role: getPrimaryRole(response.roles || []),

        /**
         * Complete role list.
         */
        roles,

        /**
         * Backend currently doesn't return email verification status.
         * Keep this true temporarily until backend adds the field.
         */
        emailVerified: true,
      },
    };
  },

  signup: (payload: SignupPayload) =>
    post<AuthResponse>(
      API_ENDPOINTS.signup,
      payload
    ),

  forgotPassword: (
    payload: ForgotPasswordPayload
  ) =>
    post<{ message: string }>(
      API_ENDPOINTS.forgotPassword,
      payload
    ),

  resetPassword: (
    payload: ResetPasswordPayload
  ) =>
    post<{ message: string }>(
      API_ENDPOINTS.resetPassword,
      payload
    ),

  verifyEmail: (token: string) =>
    post<{ message: string }>(
      API_ENDPOINTS.verifyEmail,
      { token }
    ),

  resendVerification: (email: string) =>
    post<{ message: string }>(
      API_ENDPOINTS.resendVerification,
      { email }
    ),

  completeProfile: (
    payload: Record<string, unknown>
  ) =>
    post<AuthResponse["user"]>(
      API_ENDPOINTS.completeProfile,
      payload
    ),
};