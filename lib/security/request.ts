import type { NextRequest } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function getTrustedOrigin(request: NextRequest): string {
  const configuredOrigin = process.env.FRONTEND_ORIGIN?.trim();

  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, "");
  }

  return request.nextUrl.origin;
}

/** Reject cross-site browser mutations before they reach the authenticated BFF. */
export function isTrustedMutationOrigin(request: NextRequest): boolean {
  if (SAFE_METHODS.has(request.method)) return true;

  const trustedOrigin = getTrustedOrigin(request);

  const origin = request.headers.get("origin");

  if (origin) {
    return origin === trustedOrigin;
  }

  const referer = request.headers.get("referer");

  // Browsers normally send Origin for unsafe requests.
  // If Origin is absent, require a same-origin Referer.
  if (!referer) return false;

  try {
    return new URL(referer).origin === trustedOrigin;
  } catch {
    return false;
  }
}
