import { fetchCategories } from "@/app/lib/categories/data";
import { createCategory, deleteCategory } from "@/app/lib/categories/data";
import { DeleteCategory } from "@/app/ui/categories/DeleteCategory";

export default async function Page() {
    const categories = await fetchCategories();
    return (
        <div>
            <h1>Categories</h1>
            <br></br>
            <form action={createCategory}>
                <input type="text" name="name" className="input-text" placeholder="Enter the new category's name" />
                <button type="submit" className="btn-primary">Create</button>
            </form>
            <div>
                {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                        <span>{category.name}</span>
                        <DeleteCategory id={category.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}