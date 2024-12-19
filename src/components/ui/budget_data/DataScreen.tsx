'use client'
import { sumIncome, sumExpenses } from "@/utils/calculations/calculations";
import React, {useEffect, useState } from "react";
import { formatNumWithCommas } from "@/utils/formatting";
import SearchByCategory from "./SearchByCategory";
import ExpensesChart from "./ExpensesChart";
import { getTotalBudget, getBudgetByCategory } from "@/lib/data/categories/data";
import { Expense } from "@/lib/model/domain/Expense";

interface DataScreenProps {
    periodType: string,
    filteredTransactions: Expense[],
    allTransactions: Expense[]
}


export default function DataScreen({ periodType, filteredTransactions, allTransactions }: DataScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expensesToGraph, setExpenseToGraph] = useState(allTransactions);
    const income = sumIncome(filteredTransactions);
    const expenses = sumExpenses(filteredTransactions);
    const [budget, setBudget] = useState(0);
    const net = income - expenses;

    useEffect(() => {
        const fetchBudget = async () => {
            let budgetValue;
            if (selectedCategory === 'all' || selectedCategory === '') {
                budgetValue = Number(await getTotalBudget());
            } else {
                budgetValue = Number(await getBudgetByCategory(selectedCategory));
            }

            switch (periodType) {
                case 'month':
                    budgetValue = budgetValue / 12;
                    break;
                case 'week':
                    budgetValue = budgetValue / 52;
                    break;
                default:
                    break;
            }
 
            setBudget(budgetValue);
        };

        const filteredExpenses = selectedCategory === 'all' || selectedCategory === ''
            ? allTransactions
            : allTransactions.filter(transaction => transaction.category_id === selectedCategory);

        setExpenseToGraph(filteredExpenses);
    
        fetchBudget();
    }, [selectedCategory, allTransactions]);

    return (
        <div>
            <table className="my-2">
                <thead>
                    <tr className="t-head-row">
                        <th>Income Total</th>
                        <th>Expenses Total</th>
                        <th>Net</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${formatNumWithCommas(income)}</td>
                        <td>${formatNumWithCommas(expenses)}</td>
                        <td>${formatNumWithCommas(net)}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <SearchByCategory expenses={filteredTransactions} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <ExpensesChart expenses={expensesToGraph} periodType={periodType} budget={budget} />
        </div>
    )
}