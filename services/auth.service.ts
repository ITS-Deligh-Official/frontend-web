import { post } from "./api";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
} from "@/types/auth";

export const authService = {
  login: (payload: LoginPayload) => post<AuthResponse>(API_ENDPOINTS.login, payload),

  signup: (payload: SignupPayload) => post<AuthResponse>(API_ENDPOINTS.signup, payload),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    post<{ message: string }>(API_ENDPOINTS.forgotPassword, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    post<{ message: string }>(API_ENDPOINTS.resetPassword, payload),

  verifyEmail: (token: string) =>
    post<{ message: string }>(API_ENDPOINTS.verifyEmail, { token }),

  completeProfile: (payload: Record<string, unknown>) =>
    post<AuthResponse["user"]>(API_ENDPOINTS.completeProfile, payload),
};
