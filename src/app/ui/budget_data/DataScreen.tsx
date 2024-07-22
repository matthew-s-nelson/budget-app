'use client'
import { sumIncome, sumExpenses } from "@/app/utils/calculations/calculations";
import React from "react";
import { formatNumWithCommas } from "@/app/utils/formatting";
import SearchByCategory from "./SearchByCategory";


export default function DataScreen({ transactions }) {
    const income = sumIncome(transactions);
    const expenses = sumExpenses(transactions);
    const net = income - expenses;

    return (
        <div>
            <p>Total income: ${formatNumWithCommas(income)}</p>
            <p>Total expenses: ${formatNumWithCommas(expenses)}</p>
            <p>Net: ${formatNumWithCommas(net)}</p>
            <SearchByCategory expenses={expenses} />
        </div>
    )
}