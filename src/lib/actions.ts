'use server'

import { signIn, registerUser } from '@/auth'

export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
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
}

export async function register(_currentState: unknown, formData: FormData) {
    try {
        // console.log(formData.get('name'));
        await registerUser('credentials', formData);
    } catch (error) {
        if (error) {
            switch (error.type) {
                case 'CredentialsRegister':
                    return 'Invalid Registration';
                default:
                    return 'Something went wrong';
            }
        }
    }
}