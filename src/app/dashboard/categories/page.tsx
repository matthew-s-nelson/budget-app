'use client'

import { DeleteCategory } from "@/components/ui/categories/DeleteCategory";
import { CategoryBudgetForm } from "@/components/ui/categories/CategoryBudgetForm";
import { CategoriesPresenter } from "@/app/presenters/CategoriesPresenter";
import { useState } from "react";

export default async function Page() {
    const [presenter] = useState(new CategoriesPresenter());
    const categories = await presenter.getCategories();

    const createNewCategory = async (formData: FormData) => {
        presenter.createCategory(formData);
    }

    return (
        <div>
            <h1>Categories</h1>
            <br></br>
            <form className="my-2" action={createNewCategory}>
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