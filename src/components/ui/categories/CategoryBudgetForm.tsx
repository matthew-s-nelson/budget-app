'use client'

import { setBudget } from "@/lib/data/categories/data"
import { Category } from "@/lib/definitions"
import { useState } from "react"

export function CategoryBudgetForm({ category }: { category: Category }) {
    const [annual_budget, setAnnualBudget] = useState(category.annual_budget);

    const changeAnnualBudget = (e: any) => {
        setAnnualBudget(e.target.value);
    }

    return (
        <form id="set-budget-form" action={setBudget}>
            <input name="id" type="hidden" value={category.id} />
            <input type="number" name="budget" className="input-text mx-2" placeholder="Enter the budget" value={annual_budget} onChange={changeAnnualBudget} required />
            <select name="type" className="input-text mx-2" required>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
            </select>
            <button type="submit" className="btn-primary w-32 mx-2">Set Budget</button>
        </form>
    )
}