'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { hashPassword } from '@/utils/auth/passwords';
import { User } from '@/lib/model/domain/User';

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

export async function createUser(name: string, email: string, password: string) {
    try {
        const hashedPassword = await hashPassword(password);

        await sql`INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})`;

        const data = await sql`SELECT id FROM users WHERE email=${email};`
        return data.rows[0].id;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to create the user.');
    }
}