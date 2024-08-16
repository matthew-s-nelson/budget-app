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
                {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2 my-2">
                        <span>{category.name}</span>
                        <form action={setBudget}>
                            <input name="id" type="hidden" value={category.id} />
                            <input type="number" name="budget" className="input-text" placeholder="Enter the budget" required />
                            <select name="type" className="input-text" required>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            <button type="submit" className="btn-primary">Set Budget</button>
                        </form>
                        <DeleteCategory id={category.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}