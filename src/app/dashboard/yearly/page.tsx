'use client'

import { fetchExpenses } from "@/app/lib/expenses/data";
import DataScreen from "@/app/ui/budget_data/DataScreen";
import { useEffect, useState } from "react";
import TimePeriod from "@/app/ui/budget_data/TimePeriod";

export const dynamic = 'force-dynamic';

export default function Page() {
    const [transactions, setTransactions] = useState([]);
    const [expensesToShow, setExpensesToShow] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [years, setYears] = useState([]);

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
            console.log(startOfYear.toString());
            years.push(startOfYear.toString());
        }
        return years;
    }

    function changeYear(event) {
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