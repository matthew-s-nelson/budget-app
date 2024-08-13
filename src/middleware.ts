import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './auth';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }
        
    // return NextResponse.next();
    // updateSession(request);
    const currentUser = request.cookies.get('session')?.value;

    if (currentUser != null && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (currentUser == null && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    return NextResponse.next();
}

// Adjust the matcher to suit your needs
// export const config = {
//     matcher: [''],
// };