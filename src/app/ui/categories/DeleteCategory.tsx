import { deleteCategory } from "@/app/lib/categories/data";

export async function DeleteCategory({ id }: { id: string }) {
    const deleteCategoryWithId = deleteCategory.bind(null, id);

    return (
        <form action={deleteCategoryWithId}>
            <button type="submit" className="btn-danger">Delete</button>
        </form>
    )
}