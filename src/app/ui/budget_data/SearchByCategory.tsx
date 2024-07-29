'use client'
import { useEffect, useState } from "react";
import { fetchCategories } from "@/app/lib/categories/data";
import { dateToString, formatNumWithCommas } from "@/app/utils/formatting";
import { sum } from "@/app/utils/calculations/calculations";

const ITEMS_PER_PAGE = 10;

export default function SearchByCategory({ expenses, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const [expensesToShow, setExpensesToShow] = useState(expenses);
    const [totalToShow, setTotalToShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

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
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        {selectedCategory == 'all' && <th>Category</th>}
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesToShow.map(expense => (
                        <tr key={expense.id} className={`${expense.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                            <td>{expense.description}</td>
                            {selectedCategory == 'all' && (<td>{expense.category}</td>)}
                            <td>{dateToString(expense.date)}</td>
                            <td>${formatNumWithCommas(expense.amount)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={selectedCategory == 'all' ? 3 : 2}><b>Total:</b></td>
                        <td className={`${totalToShow <= 0 ? 'text-red-500' : 'text-green-500'}`}>${formatNumWithCommas(totalToShow)}</td>
                    </tr>
                </tfoot>
            </table>
            <div>
                <button className="btn bg-blue-500 text-white py-1 px-3 mx-1 rounded" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="btn bg-blue-500 text-white py-1 px-3 mx-1 rounded" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <span>Page {currentPage} of {totalPages}</span>
            </div>
        </div>
    );
}