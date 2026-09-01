import { post } from "./api";

import { API_ENDPOINTS } from "@/lib/constants";

import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  BackendLoginData,
  SystemRole,
} from "@/types/auth";

/**
 * Converts backend roles into frontend-friendly role values.
 *
 * Backend examples:
 * SUPER_ADMIN
 * ADMIN
 * STUDENT
 *
 * Frontend examples:
 * super_admin
 * admin
 * student
 */
function normalizeRole(
  role: string
): SystemRole {
  const normalized =
    role
      .trim()
      .toLowerCase();

  const validRoles: SystemRole[] = [
    "super_admin",
    "admin",
    "student",
    "trainer",
    "recruiter",
    "institution",
    "user",
  ];

  if (
    validRoles.includes(
      normalized as SystemRole
    )
  ) {
    return normalized as SystemRole;
  }

  return "user";
}

/**
 * Determines the user's primary role.
 *
 * Priority:
 * 1. super_admin
 * 2. admin
 * 3. first assigned role
 * 4. user
 */
function getPrimaryRole(
  roles: SystemRole[]
): SystemRole {
  if (
    roles.includes("super_admin")
  ) {
    return "super_admin";
  }

  if (
    roles.includes("admin")
  ) {
    return "admin";
  }

  return roles[0] || "user";
}

export const authService = {

  /**
   * Login user.
   */
  login: async (
    payload: LoginPayload
  ): Promise<AuthResponse> => {

    /**
     * services/api.ts already unwraps:
     *
     * {
     *   success,
     *   message,
     *   data
     * }
     *
     * So this response is directly
     * BackendLoginData.
     */
    const data =
      await post<BackendLoginData>(
        API_ENDPOINTS.login,
        {
          email: payload.email,
          password: payload.password,
        }
      );

    if (
      !data ||
      !data.accessToken
    ) {
      throw new Error(
        "Login failed. Access token was not received."
      );
    }

    const roles =
      Array.isArray(data.roles)
        ? data.roles.map(
            normalizeRole
          )
        : [];

    return {
      token: data.accessToken,

      user: {
        id: data.userId,

        fullName:
          data.fullName,

        email:
          data.email,

        /**
         * Primary role used for
         * routing and dashboard selection.
         */
        role:
          getPrimaryRole(
            roles
          ),

        /**
         * Complete normalized role list.
         */
        roles,

        /**
         * Backend currently does not
         * return verification status.
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
    post<{
      message: string;
    }>(
      API_ENDPOINTS.forgotPassword,
      payload
    ),

  resetPassword: (
    payload: ResetPasswordPayload
  ) =>
    post<{
      message: string;
    }>(
      API_ENDPOINTS.resetPassword,
      payload
    ),

  verifyEmail: (
    token: string
  ) =>
    post<{
      message: string;
    }>(
      API_ENDPOINTS.verifyEmail,
      { token }
    ),

  resendVerification: (
    email: string
  ) =>
    post<{
      message: string;
    }>(
      API_ENDPOINTS.resendVerification,
      { email }
    ),

  completeProfile: (
    payload: Record<
      string,
      unknown
    >
  ) =>
    post<AuthResponse["user"]>(
      API_ENDPOINTS.completeProfile,
      payload
    ),

};