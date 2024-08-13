'use client'

import { fetchExpenses } from "@/lib/data/expenses/data";
import DataScreen from "@/app/ui/budget_data/DataScreen";
import { useEffect, useState } from "react";
import TimePeriod from "@/app/ui/budget_data/TimePeriod";
import { Expense } from "@/lib/definitions";

export const dynamic = 'force-dynamic';

export default function Page() {
    const [transactions, setTransactions] = useState<Expense[]>([]);
    const [expensesToShow, setExpensesToShow] = useState<Expense[]>([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchExpenses();
                if (data) {
                    setTransactions(data);
                    setMonths(generateMonths());
                }
            } catch (error) {
                console.error('An error occurred while fetching expenses:', error);
            }
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        // Filter expenses by the selected month
        if (selectedMonth) {
            const startOfMonth = new Date(selectedMonth);
            const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
            setExpensesToShow(transactions.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
            }));
        } else {
            setExpensesToShow(transactions);
        }
    }, [selectedMonth, transactions]);

    function generateMonths() {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 12; i++) {
            const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(month.toISOString());
        }
        return months;
    }

    function changeMonth(event: any) {
        setSelectedMonth(event.target.value);
    }

    return (
        <div>
            <p>Monthly budget</p>
            <br></br>
            <TimePeriod change={changeMonth} periods={months} periodType={'month'} />
            <DataScreen periodType={'month'} filteredTransactions={expensesToShow} allTransactions={transactions} />
        </div>
    );
}