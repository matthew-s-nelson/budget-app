'use server'

import { fetchCategories, createCategory, setBudget } from "@/lib/data/categories/data";
import { DeleteCategory } from "@/components/ui/categories/DeleteCategory";

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
                            <form action={setBudget}>
                                <input name="id" type="hidden" value={category.id} />
                                <input type="number" name="budget" className="input-text mx-2" placeholder="Enter the budget" value={category.annual_budget} required />
                                <select name="type" className="input-text mx-2" required>
                                    <option value="yearly">Yearly</option>
                                    <option value="monthly">monthly</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                                <button type="submit" className="btn-primary w-32 mx-2">Set Budget</button>
                            </form>
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