'use client';

import { fetchExpenses } from '@/lib/data/expenses/data';
import { useState, useEffect } from 'react';
import TimePeriod from '@/components/ui/budget_data/TimePeriod';
import DataScreen from '@/components/ui/budget_data/DataScreen';
import { Expense } from '@/lib/model/domain/Expense';

export default function Page() {
    const [transactions, setTransactions] = useState<Expense[]>([]);
    const [expensesToShow, setExpensesToShow] = useState<Expense[]>([]);
    const [selectedWeek, setSelectedWeek] = useState('');
    const [weeks, setWeeks] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchExpenses();
            setTransactions(data);
            setExpensesToShow(data);
            setWeeks(generateWeeks());
          } catch (error) {
            console.error('An error occurred while fetching expenses:', error);
          }
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        // Filter expenses by the selected week
        if (selectedWeek) {
            const startOfWeek = new Date(selectedWeek);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            setExpensesToShow(transactions.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
            }));
        } else {
            setExpensesToShow(transactions);
        }
    }, [selectedWeek, transactions]);

    function generateWeeks() {
        const weeks = [];
        const currentDate = new Date();
        for (let i = 0; i < 52; i++) {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() + 7 * i));
            weeks.push(startOfWeek.toISOString().split('T')[0]);
        }
        return weeks;
    }

    function changeWeek(event: any) {
        setSelectedWeek(event.target.value);
    }
    
    return (
        <div>
            <p>Weekly Budget</p>
            <br></br>
            <TimePeriod change={changeWeek} periods={weeks} periodType={'week'} />
            <DataScreen filteredTransactions={expensesToShow} allTransactions={transactions} periodType={'week'} />
        </div>
    );
}