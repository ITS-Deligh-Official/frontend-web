import "server-only";

const required = (name: string, value: string | undefined): string => {
  if (!value && process.env.NODE_ENV === "production")
    throw new Error(`Missing required environment variable: ${name}`);
  return value ?? "";
};

export const SERVER_CONFIG = Object.freeze({
  backendApiUrl: required(
    "BACKEND_API_URL",
    process.env.BACKEND_API_URL,
  ).replace(/\/$/, ""),
  sessionCookieName: process.env.SESSION_COOKIE_NAME ?? "deligh_session",
  refreshCookieName: process.env.REFRESH_COOKIE_NAME ?? "deligh_refresh",
  roleCookieName: process.env.ROLE_COOKIE_NAME ?? "deligh_role",
  roleCookieSecret: required(
    "ROLE_COOKIE_SECRET",
    process.env.ROLE_COOKIE_SECRET,
  ),
  requestTimeoutMs: Number(process.env.BACKEND_REQUEST_TIMEOUT_MS ?? "15000"),
  sessionRememberMaxAgeSeconds: Number(
    process.env.SESSION_REMEMBER_MAX_AGE_SECONDS ?? "604800",
  ),
  cookieSecure: process.env.NODE_ENV === "production",
});

if (
  !Number.isFinite(SERVER_CONFIG.requestTimeoutMs) ||
  SERVER_CONFIG.requestTimeoutMs < 1000
) {
  throw new Error(
    "BACKEND_REQUEST_TIMEOUT_MS must be a number of at least 1000",
  );
}

if (
  !Number.isFinite(SERVER_CONFIG.sessionRememberMaxAgeSeconds) ||
  SERVER_CONFIG.sessionRememberMaxAgeSeconds < 300
) {
  throw new Error("SESSION_REMEMBER_MAX_AGE_SECONDS must be at least 300");
}
