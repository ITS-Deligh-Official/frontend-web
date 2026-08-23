export type Role = "student" | "trainer" | "recruiter" | "institution";

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
  role: Role;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: Role;
    emailVerified: boolean;
  };
}
