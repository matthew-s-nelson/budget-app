import { getUserByEmail, createUser } from '@/lib/data/users/data'; // A hypothetical service to get user data
import { comparePasswords } from '@/utils/auth/passwords'; // A utility to compare passwords (e.g., bcrypt)
import { cookies } from 'next/headers';
import { uuid } from 'uuidv4';
import { NextRequest, NextResponse } from 'next/server';
import { createSession, deleteSession, getSessionUserId } from './lib/data/session/data';

const secretKey = 'secret'; // Make a env variable
const key = new TextEncoder().encode(secretKey);

export function generateSessionId() {
    return uuid();
}

export async function registerUser(provider: string, formData: FormData) {
    if (provider !== 'credentials') {
        throw new Error('Unsupported authentication provider');
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !name || !password) {
        throw { type: 'CredentialsRegister', message: 'Missing credentials' };
    }

    try {
        const user = await getUserByEmail(email);
        if (user) {
            throw { type: 'EmailAlreadyExists', message: 'Email is already registered'}
        }

        const userId = await createUser(name, email, password);

        await createCookie(userId);

        return {
            success: true,
            user: {
                id: userId,
                email: email,
                name: name
            }
        };
        
    } catch (error) {
        console.log(error);
        if (error.type === 'CredentialsRegister') {
            throw error;
        }
        throw new Error('Registration failed');
    }
}

export async function signIn(provider: string, formData: FormData) {
    if (provider !== 'credentials') {
        throw new Error('Unsupported authentication provider');
    }

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        throw { type: 'CredentialsSignIn', message: 'Missing credentials' };
    }

    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            throw { type: 'CredentialsSignIn', message: 'Invalid credentials' };
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        
        if (!isPasswordValid) {
            throw { type: 'CredentialsSignIn', message: 'Invalid credentials' };
        }

        await createCookie(user.id);

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };

    } catch (error) {
        // Handle any unexpected errors
        console.log(error);
        if (error.type === 'CredentialsSignIn') {
            throw error;
        }
        throw new Error('Authentication failed');
    }
}

export async function createCookie(userId: string) {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7);
    const sessionId = generateSessionId();
    await createSession(sessionId, userId);

    cookies().set('session', sessionId, { expires, httpOnly: true });
    console.log(cookies().get('session'));
}

export async function logout() {
    const sessionId = cookies().get('session')?.value;
    if (sessionId) {
        deleteSession(sessionId);
    }
    cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return session;
}

export async function updateSession(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
        // No session found, no need to update
        return NextResponse.next();
    }

    // Set new expiration date
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7); // 7 days from now

    // Create a new cookie with updated expiration
    const response = NextResponse.next();
    response.cookies.set('session', sessionCookie, {
        httpOnly: true,
        expires,
    });

    return response;
}

export async function getUserId() {
    const session = await getSession();
    console.log('session', session);
    if (!session) throw new Error('Session does not exist');

    const userId = await getSessionUserId(session);
    console.log('user', userId);
    return userId;
}