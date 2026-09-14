import "server-only";

const required = (name: string, value: string | undefined): string => {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`Missing required environment variable: ${name}`);
  return normalized;
};
const positiveNumber = (name: string, value: string | undefined, fallback: number, minimum: number) => {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed) || parsed < minimum) throw new Error(`${name} must be a number of at least ${minimum}`);
  return parsed;
};
const roleSecret = required("ROLE_COOKIE_SECRET", process.env.ROLE_COOKIE_SECRET);
if (roleSecret.length < 32) throw new Error("ROLE_COOKIE_SECRET must contain at least 32 characters");
export const SERVER_CONFIG = Object.freeze({
  backendApiUrl: required("BACKEND_API_URL", process.env.BACKEND_API_URL).replace(/\/$/, ""),
  sessionCookieName: process.env.SESSION_COOKIE_NAME?.trim() || "deligh_session",
  refreshCookieName: process.env.REFRESH_COOKIE_NAME?.trim() || "deligh_refresh",
  roleCookieName: process.env.ROLE_COOKIE_NAME?.trim() || "deligh_role",
  roleCookieSecret: roleSecret,
  requestTimeoutMs: positiveNumber("BACKEND_REQUEST_TIMEOUT_MS", process.env.BACKEND_REQUEST_TIMEOUT_MS, 15000, 1000),
  sessionRememberMaxAgeSeconds: positiveNumber("SESSION_REMEMBER_MAX_AGE_SECONDS", process.env.SESSION_REMEMBER_MAX_AGE_SECONDS, 604800, 300),
  cookieSecure: process.env.NODE_ENV === "production",
});
