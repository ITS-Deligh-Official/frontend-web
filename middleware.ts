import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "its_deligh_token";

// Every role has its own top-level workspace.
const PROTECTED_ROUTES = ["/student", "/trainer", "/institution", "/recruiter", "/complete-profile"];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // NOTE for backend integration: this middleware only checks *whether* a
  // token exists, not the user's role — it can't know that from a cookie
  // alone. If an already-logged-in user hits /login, we send them to "/"
  // and let the client-side role check (useAuthStore) route them onward,
  // rather than guessing their role here.
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/trainer/:path*",
    "/institution/:path*",
    "/recruiter/:path*",
    "/complete-profile/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
