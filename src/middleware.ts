import { NextRequest, NextResponse } from 'next/server';

// // Custom middleware logic
export function middleware(request: NextRequest) {
//     // You can add your middleware logic here, e.g., redirecting or logging
    return NextResponse.next();
}

// // Adjust the matcher to suit your needs
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };