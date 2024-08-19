'use client';

import { deleteCategory } from "@/lib/data/categories/data";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function DeleteCategory({ id }: { id: string }) {
    const deleteCategoryWithId = deleteCategory.bind(null, id);

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();

        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategoryWithId();
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <button type="submit" className="btn-danger">Delete</button>
        </form>
    )
}