// This middleware is no longer used since we're using client-side i18n
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { i18n } from './i18n-config';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Empty middleware that doesn't do anything
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 