import type { NextRequest } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/** Reject cross-site browser mutations before they reach the authenticated BFF. */
export function isTrustedMutationOrigin(request: NextRequest): boolean {
  if (SAFE_METHODS.has(request.method)) return true;
  const origin = request.headers.get("origin");
  if (origin) return origin === request.nextUrl.origin;
  const referer = request.headers.get("referer");
  if (!referer) return true;
  try {
    return new URL(referer).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}
