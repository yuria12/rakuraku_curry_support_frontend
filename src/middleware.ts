import { NextResponse, type NextRequest } from "next/server";
import { backendSessionCookieName } from "@/lib/auth-constants";

const protectedRoutes = ["/account", "/orders", "/logout"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function middleware(request: NextRequest) {
  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const sessionId = request.cookies.get(backendSessionCookieName)?.value;

  if (sessionId) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "redirectTo",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/account/:path*", "/account", "/orders/:path*", "/logout"],
};
