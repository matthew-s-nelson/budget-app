'use server'

import { fetchCategories, createCategory, setBudget } from "@/lib/data/categories/data";
import { DeleteCategory } from "@/components/ui/categories/DeleteCategory";
import { CategoryBudgetForm } from "@/components/ui/categories/CategoryBudgetForm";

export default async function Page() {
    const categories = await fetchCategories();

    return (
        <div>
            <h1>Categories</h1>
            <br></br>
            <form className="my-2" action={createCategory}>
                <input type="text" name="name" className="input-text" placeholder="Enter the new category's name" />
                <button type="submit" className="btn-primary">Create</button>
            </form>
            <div>
            <table className="table-auto w-full">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Budget</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td colSpan={3}>
                            <CategoryBudgetForm category={category} />
                        </td>
                        <td>
                            <DeleteCategory id={category.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </div>
    );
}