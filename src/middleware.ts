import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Routes } from './types/routes';

export async function middleware(request: NextRequest) {
  try {
    const response = await fetch('http://194.226.49.191:5555/api/auth/whoami', {
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (
      response.status === 401 &&
      request.nextUrl.pathname !== Routes['LOGIN'] &&
      request.nextUrl.pathname !== Routes['SIGNUP']
    ) {
      return NextResponse.redirect(new URL(Routes['LOGIN'], request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Ошибка во время выполнения fetch:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: ['/', '/game/:path*'],
};
