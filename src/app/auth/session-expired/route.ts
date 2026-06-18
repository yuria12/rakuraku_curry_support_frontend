import { NextRequest, NextResponse } from "next/server";
import {
  authUserCookieName,
  backendSessionCookieName,
} from "@/lib/auth-constants";

function getRedirectTo(request: NextRequest) {
  const redirectTo = request.nextUrl.searchParams.get("redirectTo") ?? "/products";

  return redirectTo.startsWith("/") && !redirectTo.startsWith("//")
    ? redirectTo
    : "/products";
}

export function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectTo", getRedirectTo(request));

  const response = NextResponse.redirect(loginUrl);

  response.cookies.delete(backendSessionCookieName);
  response.cookies.delete(authUserCookieName);

  return response;
}
