import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("access_token");
  const protectedPaths = ["/profile", "/booking", "/checkout", "/admin"];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p)) && !jwt) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
