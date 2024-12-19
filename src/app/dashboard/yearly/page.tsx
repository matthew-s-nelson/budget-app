'use client'

import { fetchExpenses } from "@/lib/data/expenses/data";
import DataScreen from "@/components/ui/budget_data/DataScreen";
import { useEffect, useState } from "react";
import TimePeriod from "@/components/ui/budget_data/TimePeriod";
import { Expense } from "@/lib/model/domain/Expense";

export const dynamic = 'force-dynamic';

export default function Page() {
    const [transactions, setTransactions] = useState<Expense[]>([]);
    const [expensesToShow, setExpensesToShow] = useState<Expense[]>([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [years, setYears] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchExpenses();
                setTransactions(data);
                setYears(generateYears());
            } catch (error) {
                console.error('An error occurred while fetching expenses:', error);
            }
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        // Filter expenses by the selected year
        if (selectedYear) {
            const startOfYear = new Date(selectedYear);
            const endOfYear = new Date(startOfYear.getFullYear(), 11, 31);
            setExpensesToShow(transactions.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startOfYear && expenseDate < endOfYear;
            }));
        } else {
            setExpensesToShow(transactions);
        }
    }, [selectedYear, transactions]);

    function generateYears() {
        const years = [];
        const currentDate = new Date();
        for (let i = 0; i < 52; i++) {
            const startOfYear = new Date(currentDate.getFullYear()-i, 0, 1);
            years.push(startOfYear.toString());
        }
        return years;
    }

    function changeYear(event: any) {
        setSelectedYear(event.target.value);
    }

    return (
        <div>
            <p>Yearly budget</p>
            <br></br>
            <TimePeriod change={changeYear} periods={years} periodType={'year'} />
            <DataScreen periodType={'year'} filteredTransactions={expensesToShow} allTransactions={transactions} />
        </div>
    );
}