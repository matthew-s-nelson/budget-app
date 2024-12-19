import { setBudget } from "@/lib/data/categories/data"
import { Category } from "@/lib/model/domain/Category"

export function CategoryBudgetForm({ category }: { category: Category }) {

    return (
        <form id="set-budget-form" action={setBudget}>
            <input name="id" type="hidden" value={category.id} />
            <input type="number" name="budget" className="input-text mx-2" placeholder="Enter the budget" defaultValue={category.annual_budget || 0} required />
            <select name="type" className="input-text mx-2" required>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
            </select>
            <button type="submit" className="btn-primary w-32 mx-2">Set Budget</button>
        </form>
    )
}