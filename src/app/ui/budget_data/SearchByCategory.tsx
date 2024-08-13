'use client'
import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/data/categories/data";
import { deleteExpense } from "@/lib/data/expenses/data";
import { dateToString, formatNumWithCommas } from "@/utils/formatting";
import { sum } from "@/utils/calculations/calculations";
import { usePathname } from 'next/navigation'

const ITEMS_PER_PAGE = 10;

export default function SearchByCategory({ expenses, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const [expensesToShow, setExpensesToShow] = useState(expenses);
    const [totalToShow, setTotalToShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const path = usePathname();

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchCategories();
            setCategories(data);
          } catch (error) {
            console.error('An error occurred while fetching categories:', error);
          }
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        const filteredExpenses = selectedCategory === 'all' || selectedCategory === ''
            ? expenses
            : expenses.filter(expense => expense.category_id === selectedCategory);
        
        setExpensesToShow(filteredExpenses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
        setTotalToShow(sum(filteredExpenses));
    }, [selectedCategory, currentPage, expenses]);

    function changeCategory(event) {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to the first page when category changes
    }

    const totalPages = Math.ceil((selectedCategory === 'all' || selectedCategory === '' ? expenses.length : expensesToShow.length) / ITEMS_PER_PAGE);

    const handleDeleteExpense = async (expenseToDelete) => {
        const message = "Are you sure you want to delete this expense: " + expenseToDelete.description + "?"
        if(confirm(message)) {
            try {
                await deleteExpense(expenseToDelete.id, path);
                alert('Expense successfully deleted');
            } catch {
                console.error('Expense failed to delete');
            }
        }
    };

    return (
        <div>
            <select name="category-select" onChange={e => changeCategory(e)}>
                <option value="">Select a category</option>
                <option key="all" value="all">All</option>
                {categories.length > 0 ? (
                        categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))) : (
                        <option value="" disabled>No categories available</option>
                    )
                }
            </select>
            <table className="my-2">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expensesToShow.map(expense => (
                        <tr key={expense.id} className={`${expense.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                            <td>{expense.description}</td>
                            <td>{dateToString(expense.date)}</td>
                            <td>${formatNumWithCommas(expense.amount)}</td>
                            <td><button onClick={() => handleDeleteExpense(expense)} className="btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={selectedCategory == 'all' ? 3 : 2}><b>Total:</b></td>
                        <td colSpan={2} className={`${totalToShow <= 0 ? 'text-red-500' : 'text-green-500'}`}>${formatNumWithCommas(totalToShow)}</td>
                    </tr>
                </tfoot>
            </table>
            <div className="my-1">
                <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="btn btn-primary mx-2" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <span>Page {currentPage} of {totalPages}</span>
            </div>
        </div>
    );
}