import { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newExpense = {
            type,
            description,
            amount: parseFloat(amount),
        };
        onAddExpense(newExpense);
        setType('');
        setDescription('');
        setAmount('');
    };

    return (
        <div>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="" disabled>Select Type</option>
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
                <option value="Savings">Savings</option>
            </select>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder='Description' required
            />
            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount' required
            />
            <button type='button' onClick={handleSubmit}>Add Expense</button>
        </div>
    )
};

export default ExpenseForm;