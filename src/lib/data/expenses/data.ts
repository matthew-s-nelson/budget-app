'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Expense } from '../../definitions';
import { getUserId } from '@/auth';

const FormSchema = z.object({
    category_id: z.string(),
    description: z.string(),
    amount: z.number(),
    type: z.enum(['expense', 'income']),
    date: z.date(),
})

const CreateExpense = FormSchema;

export async function uploadExpenses(data: any) {
    data.forEach((element: any) => {
        createExpense(element);
    });
    revalidatePath('/dashboard/expenses'); // Updates the page with the added expenses
}

export async function createExpense(data: any) {
    const { category_id, description, amount, type, date } = CreateExpense.parse({
        category_id: data.category,
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: new Date(data.date as string + 'T00:00:00'),
    });
    
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        await sql`
        INSERT INTO expenses (user_id, category_id, description, amount, type, date)
        VALUES (${userId}, ${category_id}, ${description}, ${amount}, ${type}, ${date.toISOString()})
        `;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to create expense');
    }
}

export async function fetchExpenses() {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        const data = await sql<Expense>`
            SELECT * FROM expenses 
            WHERE user_id=${userId}
            ORDER BY date DESC;`
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the expenses.');
    }
}

export async function deleteExpense(id: string, path: string) {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        await sql`
            DELETE FROM expenses
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to delete expense');
    }
    revalidatePath(path);
}