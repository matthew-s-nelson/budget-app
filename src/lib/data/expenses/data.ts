'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Expense } from '../../definitions';

const FormSchema = z.object({
    category_id: z.string(),
    description: z.string(),
    amount: z.number(),
    type: z.enum(['expense', 'income']),
    date: z.date(),
})

const CreateExpense = FormSchema;

export async function uploadExpenses(data) {
    data.forEach(element => {
        createExpense(element);
    });
    revalidatePath('/dashboard/expenses'); // Updates the page with the added expenses
}

export async function createExpense(data) {
    const { category_id, description, amount, type, date } = CreateExpense.parse({
        category_id: data.category,
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: new Date(data.date as string),
    });
    
    await sql`
    INSERT INTO expenses (category_id, description, amount, type, date)
    VALUES (${category_id}, ${description}, ${amount}, ${type}, ${date})
    `;
}

export async function fetchExpenses() {
    try {
        const data = await sql<Expense>`SELECT * FROM expenses;`
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the expenses.');
    }
}

export async function deleteExpense(id: string, path: string) {
    // console.log(id);
    // console.log(path)
    await sql`
        DELETE FROM expenses
        WHERE id = ${id}
    `;
    revalidatePath(path);
}

// export async function deleteCategory(id: string) {
//     await sql`
//     DELETE FROM categories
//     WHERE id = ${id}
//     `;

//     revalidatePath('/dashboard/expenses');
// }