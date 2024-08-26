import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname == '/') {
        return NextResponse.next();
    }

    const currentUser = request.cookies.get('session')?.value;

    if (currentUser != null && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (currentUser == null && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    return NextResponse.next();
}
