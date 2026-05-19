import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get('role')?.value;

  // If the user is not an admin, redirect them to the home (login) page
  if (roleCookie !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Only run the middleware on /admin and its subroutes
export const config = {
  matcher: '/admin/:path*',
};
