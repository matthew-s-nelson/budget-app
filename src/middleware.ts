import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.headers.get("Authorization");
    // if (token === null) {
    //     // Rreturn to login page
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    // Allow them to proceed
    return NextResponse.next();
}

// export const config = {
//     matcher: [
//         "/api/:path*"
//     ]
// }