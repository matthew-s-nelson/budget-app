'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Category } from '../definitions';

const FormSchema = z.object({
    name: z.string(),
})

const CreateCategory = FormSchema;

export async function createCategory(formData: FormData) {
    const { name } = CreateCategory.parse({
        name: formData.get('name'),
    });
    
    await sql`
    INSERT INTO categories (name)
    VALUES (${name})
    `;

    revalidatePath('/dashboard/categories'); // Updates the page with the added category
}

export async function fetchCategories() {
    try {
        const data = await sql<Category>`SELECT * FROM categories;`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}

export async function deleteCategory(id: string) {
    await sql`
    DELETE FROM categories
    WHERE id = ${id}
    `;

    revalidatePath('/dashboard/expenses');
}