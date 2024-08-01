"use server";

import { ZodError, z } from 'zod';

const schemaRegister = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
});

export async function registerUser(prevState: any, formData: FormData) {
    console.log("Hello from logging in");

    const validatedFields = schemaRegister.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register.",
        };
    }

    return {
        ...prevState,
        data: "ok",
    };
}








// 'use server'

// import { authConfig } from '@/auth.config'; // Make sure you have the correct path
// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { getToken } from 'next-auth/jwt';
// import { sql } from '@vercel/postgres';
// import { User } from './definitions';
// import bcrypt from 'bcrypt';

// // Encrypt function (you need to implement or import this)
// import crypto from 'crypto';

// function encrypt(text: string): string {
//     const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }

// export async function authenticate(req: NextRequest, formData: FormData) {
//     try {
//         const email = formData.get('email') as string;
//         const password = formData.get('password') as string;

//         // Validate user credentials (replace with your user fetching logic)
//         const user = await getUser(email);
//         if (!user) return 'Invalid Credentials.';

//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) return 'Invalid Credentials.';

//         // Handle session creation and encryption
//         const sessionData = { email: user.email }; // Add more session data as needed
//         await handleLogin(sessionData);

//         return 'Login successful';
//     } catch (error) {
//         console.error('Error during authentication:', error);
//         return 'Something went wrong.';
//     }
// }

// async function getUser(email: string) {
//     // Fetch the user from your database (replace with your actual logic)
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
// }

// export async function handleLogin(sessionData: any) {
//     const encryptedSessionData = encrypt(JSON.stringify(sessionData));
//     cookies().set('session', encryptedSessionData, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24 * 7, // 1 week
//         path: '/',
//     });
// }
