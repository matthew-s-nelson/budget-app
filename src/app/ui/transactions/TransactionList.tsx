import React from 'react';
import { Category } from '@/lib/definitions';

interface TransactionListProps {
    expenses: any,
    removeExpense: any,
    categories: Category[]
}

const TransactionList: React.FC<TransactionListProps> = ({ expenses, removeExpense = null, categories }) => {
    return (
        <div>
            <ul className="mt-3 space-y-3">
                {expenses.map((expense: any) => (
                    <li key={expense.id}
                        className={`flex justify-between items-center p-4 border rounded
                                    ${expense.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                        <div>
                            <h4>{expense.description} - ${expense.amount}</h4>
                            <small className="text-gray-500">{categories.find(element => element.id === expense.category)?.name || 'Undefined Category'}: {expense.date}</small>
                        </div>
                        {removeExpense && (
                        <div>
                            <button className="bg-red-500 text-white py-2 px-4 rounded"
                                    onClick={() => removeExpense(expense.id)}>
                                Remove
                            </button>
                        </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList;
