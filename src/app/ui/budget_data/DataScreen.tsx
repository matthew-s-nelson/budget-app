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
            <table>
                <thead>
                    <tr>
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
            <SearchByCategory expenses={transactions} />
        </div>
    )
}