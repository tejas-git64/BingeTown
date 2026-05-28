import { NextResponse, type NextRequest } from "next/server";

const authCookieName = "bingetown-auth";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get(authCookieName)?.value === "true";

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/movies/:path*",
    "/shows/:path*",
    "/saved/:path*",
    "/search/:path*",
    "/watchlist/:path*",
  ],
};
