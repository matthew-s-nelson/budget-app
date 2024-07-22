import React from 'react';

const AddTransaction = ({
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    type,
    setType,
    balance,
    setBalance,
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    addExpense,
    category,
    setCategory,
    categories
}) => {
    return (
        <div className="mx-auto text-center md:w-1/2">
            <div className="mt-3">
                <h3>Balance: 
                    <b className="text-gray-800"> ${balance.toFixed(2)}</b>
                </h3>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div>
                    <h3>Income <span className="text-green-500">${totalIncome.toFixed(2)}</span></h3>
                </div>
                <div>
                    <h3>Expense <span className="text-red-500">${totalExpense.toFixed(2)}</span></h3>
                </div>
            </div>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-input w-full"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="flex mt-3">
                <div className="w-1/3 pr-2">
                    <input
                        type="number"
                        className="form-input w-full"
                        placeholder="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <div className="w-1/3 px-2">
                    <input
                        type="date"
                        className="form-input w-full"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="w-1/3 pl-2">
                    <select
                        className="form-select w-full"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
            </div>
            <div className="mt-3">
                <select className="form-select w-full" onChange={e => setCategory(e.target.value)}>
                    <option value="">Select an option</option>
                    {categories.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
            <div className="mt-3">
                <button
                    className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={addExpense}
                >
                    Add Transaction
                </button>
            </div>
        </div>
    );
};

export default AddTransaction;
