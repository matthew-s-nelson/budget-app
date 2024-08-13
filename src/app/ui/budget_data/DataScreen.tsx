'use client'
import { sumIncome, sumExpenses } from "@/utils/calculations/calculations";
import React, {useEffect, useState } from "react";
import { formatNumWithCommas } from "@/utils/formatting";
import SearchByCategory from "./SearchByCategory";
import ExpensesChart from "./ExpensesChart";


export default function DataScreen({ periodType, filteredTransactions, allTransactions }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expensesToGraph, setExpenseToGraph] = useState(allTransactions);
    const income = sumIncome(filteredTransactions);
    const expenses = sumExpenses(filteredTransactions);
    const net = income - expenses;

    useEffect(() => {
        const filteredExpenses = selectedCategory === 'all' || selectedCategory === ''
            ? allTransactions
            : allTransactions.filter(transaction => transaction.category_id === selectedCategory);

        setExpenseToGraph(filteredExpenses);
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
            <ExpensesChart expenses={expensesToGraph} periodType={periodType} />
        </div>
    )
}