import { getUserByEmail } from '@/lib/data/users/data'; // A hypothetical service to get user data
import { comparePasswords } from '@/utils/auth/passwords'; // A utility to compare passwords (e.g., bcrypt)
import { cookies } from 'next/headers';
import { uuid } from 'uuidv4';
import { NextRequest, NextResponse } from 'next/server';
import { createSession, deleteSession } from './lib/data/session/data';

const secretKey = 'secret'; // Make a env variable
const key = new TextEncoder().encode(secretKey);

export function generateSessionId() {
    return uuid();
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
        console.log('here');

        const expires = new Date(Date.now() + 60 * 60 * 24 * 7);
        const sessionId = generateSessionId();
        await createSession(sessionId, user.id);

        cookies().set('session', sessionId, { expires, httpOnly: true });
        console.log(cookies().get('session'));

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
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    console.log(session);
    // if (!session) return;
    // session.expires = new Date(Date.now() + 60 * 60 * 24 * 7);
    // return NextResponse.next().cookies.set({
    //     name: 'session',
    //     value: session,
    //     httpOnly: true,
    //     expires: parsed.expires,
    // });
}