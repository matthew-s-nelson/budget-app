import { deleteCategory } from "@/lib/data/categories/data";

export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // solve everything 

export async function DeleteCategory({ id }: { id: string }) {
    const deleteCategoryWithId = deleteCategory.bind(null, id);

    return (
        <form action={deleteCategoryWithId}>
            <button type="submit" className="btn-danger">Delete</button>
        </form>
    )
}