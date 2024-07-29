'use client'

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpensesChart = ({ expenses, periodType }) => {
    const [expenseData, setExpenseData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const groupByPeriod = (expenses) => {
            const periods = {};
            expenses.forEach(expense => {
                const expenseDate = new Date(expense.date);
                
                let periodKey;
                if (periodType === 'year') {
                    const startOfYear = new Date(expenseDate.getFullYear(), 0, 1);
                    periodKey = startOfYear.toISOString().split('T')[0];
                } else if (periodType === 'week') {
                    const startOfWeek = new Date(expenseDate);
                    startOfWeek.setDate(expenseDate.getDate() - expenseDate.getDay());
                    periodKey = startOfWeek.toISOString().split('T')[0];
                }

                if (!periods[periodKey]) {
                    periods[periodKey] = 0;
                }
                if (expense.type === 'expense') {
                    periods[periodKey] += expense.amount;
                }
            });

            const labels = Object.keys(periods).sort();
            const data = labels.map(label => periods[label]);

            return { labels, data };
        };

        const processExpenses = async () => {
            try {
                const { labels, data } = groupByPeriod(expenses);

                setExpenseData({
                    labels,
                    datasets: [
                        {
                            label: 'Expenses',
                            data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('An error occurred while fetching expenses:', error);
            }
        };

        processExpenses();
    }, [expenses]);

    return (
        <div>
            <Bar data={expenseData} />
        </div>
    );
};

export default ExpensesChart;