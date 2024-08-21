'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Category } from '../../definitions';
import { getUserId } from '@/auth';

const FormSchema = z.object({
    name: z.string(),
})

const CreateCategory = FormSchema;

export async function createCategory(formData: FormData) {
    const { name } = CreateCategory.parse({
        name: formData.get('name'),
    });
    
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        await sql`
        INSERT INTO categories (user_id, name)
        VALUES (${userId}, ${name})
        `;
    } catch (error) {
        console.error("Database error", error);
        throw new Error('Failed to create category');
    }

    revalidatePath('/dashboard/categories'); // Updates the page with the added category
}

export async function setBudget(formData: FormData) {
    const userId = await getUserId();
    if (!userId) throw new Error('No user id');

    let budget = formData.get('budget');
    const id = formData.get('id') as string;
    const type = formData.get('type');

    if (budget === null || isNaN(Number(budget))) {
        throw new Error('Invalid budget');
    } else if (id === null) {
        throw new Error('Invalid category id');
    } else if (type === null) {
        throw new Error('Invalid budget type');
    }

    if (type === "weekly") {
        budget = (Number(budget) * 52).toString();
    } else if (type === "monthly") {
        budget = (Number(budget) * 12).toString();
    } else if (type === "yearly") {
        budget = budget.toString();
    } else {
        throw new Error('Invalid budget type');
    }

    try {
        await sql`
        UPDATE categories
        SET annual_budget = ${budget}
        WHERE id = ${id} AND user_id = ${userId}
        `;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to set budget');
    }

    revalidatePath('/dashboard/categories');
}

export async function fetchCategories() {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        const data = await sql<Category>`SELECT * FROM categories WHERE user_id=${userId};`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}

export async function deleteCategory(id: string) {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        await sql`
        DELETE FROM categories
        WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to delete cateogry');
    }

    revalidatePath('/dashboard/expenses');
}

export async function getBudgetByCategory(id: string) {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        const data = await sql<Category>`SELECT annual_budget FROM categories WHERE id=${id} AND user_id=${userId};`;
        return data.rows[0].annual_budget;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the category.');
    }
}

export async function getTotalBudget() {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error('No user id');

        const data = await sql<any>`SELECT SUM(annual_budget) FROM categories WHERE user_id=${userId};`;
        console.log(data.rows[0].sum);
        return data.rows[0].sum;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the total budget.');
    }
}