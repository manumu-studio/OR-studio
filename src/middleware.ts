// Middleware — blocks unknown routes. Only allows routes that exist on the site.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Allowed routes (public pages + Payload admin/API for CMS) */
const ALLOWED_PATHS = ['/', '/works', '/about', '/contact', '/admin', '/api'] as const;

function isAllowed(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  return ALLOWED_PATHS.some((allowed) => path === allowed || path.startsWith(`${allowed}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // — Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // — Allow known routes
  if (isAllowed(pathname)) {
    return NextResponse.next();
  }

  // — Block any other unknown route (404)
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
