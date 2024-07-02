import { fetchCategories } from "@/app/lib/data";
import { createCategory, deleteCategory } from "@/app/lib/categories/data";
import { DeleteCategory } from "@/app/ui/categories/DeleteCategory";

export default async function Page() {
    const categories = await fetchCategories();
    return (
        <div>
            <h1>Categories</h1>
            <br></br>
            <form action={createCategory}>
                <input type="text" name="name" placeholder="Enter the new category's name" />
                <button type="submit">Create</button>
            </form>
            <div>
                {categories.map(category => (
                    <div>
                        <span>{category.name}</span>
                        <DeleteCategory id={category.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}