import { NextResponse } from "next/server";

export async function GET() {
  const origin =
    process.env.FRONTEND_ORIGIN || "https://delighcampus.itsdeligh.com";

  return NextResponse.redirect(
    new URL("/api/oauth2/authorization/google", origin),
  );
}
