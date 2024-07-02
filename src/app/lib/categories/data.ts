'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

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

export async function deleteCategory(id: string) {
    await sql`
    DELETE FROM categories
    WHERE id = ${id}
    `;

    revalidatePath('/dashboard/expenses');
}