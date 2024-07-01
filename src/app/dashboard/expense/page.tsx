'use client';

import { useState } from "react";
import AddTransaction from "@/app/ui/transactions/AddTransaction";
import TransactionList from "@/app/ui/transactions/TransactionList";

export default function Page() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [balance, setBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [date, setDate] = useState(new Date().toLocaleDateString());

    const addExpense = () => {
        if (!description.trim() || !amount.trim()) return; // Trim removes whitespace from beginning and end of a string
        const newExpense = { id: expenses.length + 1,
          description, amount: parseFloat(amount), type, date };
        setExpenses([...expenses, newExpense]);
        setBalance(type === 'expense' ?
            balance - parseFloat(amount) : balance + parseFloat(amount));
        if (type === 'expense') {
          setTotalExpense(totalExpense + parseFloat(amount));
        } else {
          setTotalIncome(totalIncome + parseFloat(amount));
        }
        setDescription('');
        setAmount('');
        setDate(new Date().toLocaleDateString());
    };

    const removeExpense = (id) => {
        const expensesToRemove = expenses.find(expense => expense.id === id);
        if (expensesToRemove) {
          setExpenses(expenses.filter(expense => expense.id !== id));
          setBalance(expensesToRemove.type === 'expense' ?
            balance + expensesToRemove.amount :
            balance - expensesToRemove.amount );
          if (expensesToRemove.type === 'expense') {
            setTotalExpense(totalExpense - expensesToRemove.amount);
          } else {
            setTotalIncome(totalIncome - expensesToRemove.amount);
          }
        }
      };

      return (
        <div className="container mx-auto bg-gray-100 mt-12 p-6 border border-gray-800 md:w-2/3">
          <h4 className="mt-2 text-center">Expense Tracker</h4>
          <AddTransaction 
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          type={type}
          setType={setType}
          balance={balance}
          setBalance={setBalance}
          totalIncome={totalIncome}
          setTotalIncome={setTotalIncome}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
          addExpense={addExpense}
          />
          <TransactionList 
          expenses={expenses}
          removeExpense={removeExpense}
          />
        </div>
      );
}
