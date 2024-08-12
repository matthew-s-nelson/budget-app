import { NextRequest } from 'next/server';
import { updateSession } from './auth';

export function middleware(request: NextRequest) {
    // updateSession(request);
    const currentUser = request.cookies.get('session')?.value;

    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/dashboard', request.url));
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
        return Response.redirect(new URL('/auth/signin', request.url));
    }
}

// Adjust the matcher to suit your needs
// export const config = {
//     matcher: [''],
// };