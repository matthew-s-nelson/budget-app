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