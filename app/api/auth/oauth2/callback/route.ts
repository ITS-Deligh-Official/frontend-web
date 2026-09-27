import { NextRequest, NextResponse } from "next/server";

import { SERVER_CONFIG } from "@/lib/config/server";
import { API_ENDPOINTS, getRoleHome } from "@/lib/config/shared";
import {
  primaryRole,
  signRole,
} from "@/lib/security/session";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(
    SERVER_CONFIG.sessionCookieName,
  )?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", request.url),
    );
  }

  try {
    const backendResponse = await fetch(
      `${SERVER_CONFIG.backendApiUrl}${API_ENDPOINTS.currentUser}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionCookie}`,
        },
        cache: "no-store",
      },
    );

    if (!backendResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=oauth_failed", request.url),
      );
    }

    const body = await backendResponse.json();

    const user = body?.data ?? body?.user ?? body;

    const roles: string[] = Array.isArray(user?.roles)
      ? user.roles
      : user?.role
        ? [user.role]
        : [];

    const role = primaryRole(roles);

    const response = NextResponse.redirect(
      new URL(getRoleHome(role), request.url),
    );

    response.cookies.set(
      SERVER_CONFIG.roleCookieName,
      signRole(role),
      {
        httpOnly: true,
        secure: SERVER_CONFIG.cookieSecure,
        sameSite: "lax",
        path: "/",
        maxAge: SERVER_CONFIG.sessionRememberMaxAgeSeconds,
      },
    );

    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", request.url),
    );
  }
}