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
 * Backend:
 * SUPER_ADMIN
 *
 * Frontend:
 * super_admin
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
 * 1. SUPER_ADMIN
 * 2. ADMIN
 * 3. Other role
 * 4. USER
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

    /**
     * Backend response structure:
     *
     * {
     *   success: true,
     *   message: "Login successful",
     *   data: {
     *     accessToken,
     *     userId,
     *     fullName,
     *     email,
     *     roles
     *   }
     * }
     */
    if (!response.success || !response.data) {
      throw new Error(
        response.message || "Login failed"
      );
    }

    const data = response.data;

    const roles = Array.isArray(data.roles)
      ? data.roles.map(normalizeRole)
      : [];

    return {
      token: data.accessToken,

      user: {
        id: data.userId,

        fullName: data.fullName,

        email: data.email,

        /**
         * Primary role used for
         * routing and dashboard selection.
         */
        role: getPrimaryRole(data.roles || []),

        /**
         * Complete normalized role list.
         */
        roles,

        /**
         * Backend does not currently
         * return email verification status.
         */
        emailVerified: true,
      },
    };
  },

  signup: (
    payload: SignupPayload
  ) =>
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

  verifyEmail: (
    token: string
  ) =>
    post<{ message: string }>(
      API_ENDPOINTS.verifyEmail,
      { token }
    ),

  resendVerification: (
    email: string
  ) =>
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