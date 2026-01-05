import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');

  const protectedPaths = [
    '/profile',
    '/checkout',
    '/booking',
    '/admin',
  ];

  const isProtected = protectedPaths.some(p =>
    req.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
