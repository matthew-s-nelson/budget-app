'use client'

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Expense } from '@/lib/definitions';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

interface ExpensesChartProps {
    expenses: Expense[],
    periodType: string,
    budget: number
}

interface ExpensePeriods {
    [key: string]: any;
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ expenses, periodType, budget }) => {
    const [expenseData, setExpenseData] = useState<any>({ labels: [], datasets: [] });


    useEffect(() => {
        const groupByPeriod = (expenses: Expense[]) => {
            const expensePeriods: ExpensePeriods = {};
            const incomePeriods: ExpensePeriods = {};
            expenses.forEach(expense => {
                const expenseDate = new Date(expense.date);
                
                let periodKey;
                if (periodType === 'year') {
                    const startOfYear = new Date(expenseDate.getFullYear(), 0, 1);
                    periodKey = startOfYear.toISOString().split('T')[0];
                } else if (periodType === 'month') {
                    const startOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1);
                    periodKey = startOfMonth.toISOString().split('T')[0];
                } else if (periodType === 'week') {
                    const startOfWeek = new Date(expenseDate);
                    startOfWeek.setDate(expenseDate.getDate() - expenseDate.getDay());
                    periodKey = startOfWeek.toISOString().split('T')[0];
                }

                if (periodKey) {
                    if (!expensePeriods[periodKey]) {
                        expensePeriods[periodKey] = 0;
                    }
                    if (!incomePeriods[periodKey]) {
                        incomePeriods[periodKey] = 0;
                    }
                    if (expense.type === 'expense') {
                        expensePeriods[periodKey] += expense.amount;
                    } else if (expense.type === 'income') {
                        incomePeriods[periodKey] += expense.amount;
                    }
                }
            });
            const labels = Array.from(new Set([...Object.keys(expensePeriods), ...Object.keys(incomePeriods)])).sort();
            const expenseData = labels.map(label => expensePeriods[label]);
            const incomeData = labels.map(label => incomePeriods[label]);

            return { labels, expenseData, incomeData };
        };

        const processExpenses = async () => {
            try {
                const { labels, expenseData, incomeData } = groupByPeriod(expenses);

                setExpenseData({
                    labels,
                    datasets: [
                        {
                            label: 'Expenses',
                            data: expenseData,
                            backgroundColor: 'rgba(255, 99, 192, 0.2)',
                            borderColor: 'rgba(255, 99, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Income',
                            data: incomeData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ],
                });
            } catch (error) {
                console.error('An error occurred while fetching expenses:', error);
            }
        };

        processExpenses();
    }, [expenses, budget, periodType]);

    const options: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    budget: {
                        type: 'line',
                        scaleID: 'y',
                        value: budget,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                        label: {
                            content: 'Budget',
                            position: 'end',
                        }
                    }
                }
            }
        }
    };

    return (
        <div>
            <Bar data={expenseData} options={options} />
        </div>
    );
};

export default ExpensesChart;