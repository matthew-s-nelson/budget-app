import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { User } from '../../definitions';
import { Car } from 'lucide-react';

const FormSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const CreateSession = FormSchema;

export async function createSession(sessionId: string, userId: string) {
    try {
        await deleteSessionByUserId(userId)
        const createdAt = new Date().toISOString();

        await sql`INSERT INTO sessions (id, user_id, created_at)
        VALUES (${sessionId}, ${userId}, ${createdAt})`;

        return true;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to create the session.');
    }
}

export async function deleteSession(sessionId: string) {
    try {
        await sql`DELETE FROM sessions WHERE id=${sessionId}`;
        return true;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to delete the session');
    }
}

export async function deleteSessionByUserId(userId: string) {
    try {
        await sql`DELETE FROM sessions WHERE user_id=${userId}`;
        return true
    } catch (error) {
        console.error('Databse error:', error);
        throw new Error('Failed to delete the session');
    }
}

export async function getSessionUserId(sessionId: string) {
    try {
        const data = await sql`SELECT * FROM sessions WHERE id=${sessionId}`;
        return data.rows[0].user_id;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to retrieve session');
    }
}