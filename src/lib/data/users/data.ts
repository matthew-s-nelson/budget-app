'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { User } from '../../definitions';

const FormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const CreateUser = FormSchema;

export async function getUserByEmail(email: string) {
    try {
        const data = await sql<User>`SELECT * FROM users WHERE email=${email};`
        return data.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch the user.');
    }
}