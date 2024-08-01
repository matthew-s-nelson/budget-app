// import type { NextAuthOptions } from 'next-auth';

// export const authConfig: NextAuthOptions = {
//     pages: {
//         signIn: '/login',
//     },
//     callbacks: {
//         async signIn({ user, account, profile }) {
//             // Additional sign-in logic can be added here if needed
//             return true; // Return true to allow the sign-in
//         },
//         async redirect({ url, baseUrl }) {
//             // Handle redirection after sign-in
//             if (url.startsWith('/')) return `${baseUrl}${url}`; // Redirect to internal paths
//             return baseUrl; // Redirect to home for external URLs
//         },
//         async session({ session, token, user }) {
//             // Customize session object
//             return session;
//         },
//         async jwt({ token, user, account, profile, isNewUser }) {
//             // Customize JWT token
//             return token;
//         },
//     },
//     providers: [],
// };
