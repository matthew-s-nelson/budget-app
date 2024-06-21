'use client';

import { useState } from 'react';
import NWSTable from '@/app/ui/budget-calculator/needs-wants-savings';
import ExpenseForm from '@/app/ui/budget-calculator/add-expense';

export default function Page() {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const [weeklyIncome, setWeeklyIncome] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [totalExepenses, setTotalExpenses] = useState(0);
    const [needsExpenses, setNeedsExpenses] = useState(0);
    const [wantsExpenses, setWantsExpenses] = useState(0);
    const [savingsExpenses, setSavingsExpenses] = useState(0);

    const handleChangeMonthlyIncome = (event) => {
        setMonthlyIncome(event.target.value);
        setYearlyIncome(event.target.value * 12);
        setWeeklyIncome(event.target.value * 3 / 13);
    };

    const handleAddExpense = (newExpense) => {
        setExpenses(prevExpenses => [...expenses, newExpense]);

        switch(newExpense.type) {
            case "Needs":
                setNeedsExpenses(needsExpenses + newExpense.amount);
                break;
            case "Wants":
                setWantsExpenses(wantsExpenses + newExpense.amount);
                break;
            case "Savings":
                setSavingsExpenses(savingsExpenses + newExpense.amount);
                break;
        }

        handleChangeTotalExpenses(newExpense.amount);
    }

    const handleChangeTotalExpenses = (expense) => {
        setTotalExpenses(totalExepenses + expense);
    }

    return (
        <div>
            <h1>A recommended budget is often 50% towards needs, 30% towards wants, and 20% towards savings and paying off debts. However, this should be adjusted according to individual circumstances.</h1>
            <h1 className="m-3">Caclulate your budget</h1>
            <form>
                <div className="my-5">
                    <label htmlFor='monthly_income' className="m-2">Monthly Income</label>
                    <input type="number" name="monthly_income" className="rounded" onChange={handleChangeMonthlyIncome}></input>
                </div>
                <div className='my-5'>
                    <h3>Yearly income: ${yearlyIncome}</h3>
                    <h3>Weekly income: ${weeklyIncome.toFixed(2)}</h3>
                </div>
                <div className='my-5'>
                    <label htmlFor='expense_description' className="m-2">Add a fixed monthly expense</label>
                    <ExpenseForm onAddExpense={handleAddExpense} />
                </div>
                <div className='my-5'>
                    <h3>Fixed Expenses</h3>
                    <ul>
                        {expenses.map((expense) => {
                            <li key={expense.description}>
                                <strong>{expense.description}:</strong> {expense.amount}
                            </li>
                        })}
                    </ul>
                </div>
                <div className='my-5'>
                    <h3>Total Fixed Monthl Expenses: ${totalExepenses}</h3>
                    <h3>Left Over Monthly Income: ${monthlyIncome - totalExepenses}</h3>
                </div>
                <div className='my-5'>
                    <h3>Recommended Monthly Budget:</h3>
                    <NWSTable needs={(monthlyIncome * 0.5).toFixed(2)} wants={(monthlyIncome * 0.3).toFixed(2)} savings={(monthlyIncome * 0.2).toFixed(2)} />
                </div>
                <div className='my-5'>
                    <h3>Your monthly budget breakdown:</h3>
                    <NWSTable needs={needsExpenses} wants={wantsExpenses} savings={savingsExpenses} />
                </div>
            </form>
        </div>
    );
}