import { sql } from '@vercel/postgres';
import {
    Category
} from './definitions';

export async function fetchCategories() {
    try {
        const data = await sql<Category>`SELECT * FROM categories;`
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}