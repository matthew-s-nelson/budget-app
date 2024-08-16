import { useState } from 'react';

interface DropdownWithInputProps {
    options: any,
    onAddExpense: any
}

const DropdownWithInput: React.FC<DropdownWithInputProps> =  ({ options, onAddExpense }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value);
    };

    const handleAmountChange = (event: any) => {
        setAmount(event.target.value);
    };

    const handleAddExpense = () => {
        if (selectedCategory && amount) {
            onAddExpense({ category: selectedCategory, amount: parseFloat(amount) });
            setSelectedCategory('');
            setAmount('');
        } else {
            alert('Please select a category and input an amount.');
        }
    }


    return (
        <div className="flex">
            <form onSubmit={handleAddExpense}>
            <select value={selectedCategory} onChange={handleCategoryChange} className='w-1/3 m-4 py-1'>
                <option value="" disabled>Select Category</option>
                {options.map((option: any, index: number) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <input type="number" value={amount} onChange={handleAmountChange} placeholder='Amount' className='w-1/3 py-1 px-2 m-4 rounded'/>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>
                Add Expense
            </button>
            </form>
        </div>
    )
};

export default DropdownWithInput;