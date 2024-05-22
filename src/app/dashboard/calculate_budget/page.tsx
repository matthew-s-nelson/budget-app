'use client';

import { useState } from 'react';

export default function Page() {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const [weeklyIncome, setWeeklyIncome] = useState(0);
    const [expenses, setExpenses] = useState(new Map());
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);

    const handleChangeMonthlyIncome = (event) => {
        setMonthlyIncome(event.target.value);
        setYearlyIncome(event.target.value * 12);
        setWeeklyIncome(event.target.value * 3 / 13);
    };

    const handleAddExpense = (event) => {
        event.preventDefault();
        if (expenseDescription && expenseAmount != 0) {
            const newMap = new Map(expenses);
            newMap.set(expenseDescription, expenseAmount);
            setExpenses(newMap);
            setExpenseAmount(0);
            setExpenseDescription('');
        } else {
            alert('Please include both an expense description and amount.');
        }
    }

    const handleChangeExpenseDescription = (event) => {
        setExpenseDescription(event.target.value);
    };

    const handleChangeExpenseAmount = (event) => {
        setExpenseAmount(event.target.value);
    };

    return (
        <div>
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
                    <input type="text" name="expense_description" className="m-2 rounded" onChange={handleChangeExpenseDescription} placeholder="Expense Description"/>
                    <input type="number" name="expense_amount" className="m-2 rounded" onChange={handleChangeExpenseAmount} placeholder="$ Amount"/>
                    <button onClick={handleAddExpense}>Add Expense</button>
                </div>
                <div className='my-5'>
                    <h3>Fixed Expenses</h3>
                    <ul>
                        {[...expenses].map(([description, amount]) => (
                            <li key={description}>
                                <strong>{description}:</strong> {amount}
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}