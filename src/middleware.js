import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  if (url.pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Hardcoded credentials for quick setup. 
      // The user can change these in Vercel environment variables or directly in code.
      const ADMIN_USER = process.env.ADMIN_USER || 'admin';
      const ADMIN_PASS = process.env.ADMIN_PASS || 'dropship123';

      if (user === ADMIN_USER && pwd === ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
