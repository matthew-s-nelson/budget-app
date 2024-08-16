'use server'

import { signIn, registerUser } from '@/auth'
import { redirect } from 'next/navigation';

export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error: any) {
        console.error(error);
        if (error) {
            switch (error.type) {
                case 'CredentialsSignIn':
                    return 'Invalid credentials';
                case 'EmailAlreadyExists':
                    return 'Email is already registered';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
    redirect('/dashboard');
}

export async function register(_currentState: unknown, formData: FormData) {
    try {
        await registerUser('credentials', formData);
    } catch (error: any) {
        if (error) {
            console.error(error);
            switch (error.type) {
                case 'CredentialsRegister':
                    return 'Invalid Registration';
                default:
                    return 'Something went wrong';
            }
        }
    }
    redirect('/dashboard');
}