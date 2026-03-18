
// Conceptual middleware.ts for route protection
// This represents the server-side guard logic for desk.london

/*
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  const role = token.role as string;

  // Guest Guard
  if (pathname.startsWith('/dashboard/guest') && role !== 'GUEST') {
    return NextResponse.redirect(new URL('/dashboard/supplier?error=restricted', req.url));
  }

  // Supplier Guard
  if (pathname.startsWith('/dashboard/supplier') && role !== 'SUPPLIER') {
    return NextResponse.redirect(new URL('/dashboard/guest?error=restricted', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
*/
