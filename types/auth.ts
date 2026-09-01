export type Role =
  | "super_admin"
  | "admin"
  | "student"
  | "trainer"
  | "recruiter"
  | "institution"
  | "user";

/**
 * System roles.
 *
 * New roles can be added here in the future.
 */
export type SystemRole = Role;

/**
 * Only these roles can be selected during public signup.
 *
 * Admin and Super Admin must never be publicly selectable.
 */
export type SignupRole =
  | "student"
  | "trainer"
  | "recruiter"
  | "institution";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role: SignupRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

/**
 * Login data returned inside the backend
 * API response's "data" property.
 */
export interface BackendLoginResponse {
  accessToken: string;
  tokenType: string;
  userId: string;
  fullName: string;
  email: string;
  roles: string[];
}

/**
 * Frontend authenticated user.
 */
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;

  /**
   * Primary role used for routing
   * and dashboard selection.
   */
  role: SystemRole;

  /**
   * All normalized roles assigned
   * to this user.
   */
  roles: SystemRole[];

  emailVerified: boolean;
}

/**
 * Normalized frontend authentication response.
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: AuthUser;
}