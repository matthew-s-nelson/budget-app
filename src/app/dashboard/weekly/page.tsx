'use client';

import Table from '@/app/ui/table';
import DropdownWithInput from '@/app/ui/dropdown';
import { useState } from 'react';

const categories = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'gas', label: 'Gas' },
    { value: 'entertainment', label: 'Entertainment'},
    { value: 'rent', label: 'Rent' },
];

export default function Page() {
    const [row, setRow] = useState({groceries: 0, gas: 0, entertainment: 0, rent: 0});
    const handleAddExpense = ({ category, amount }) => {
        let newRow = { ...row };

        switch (category) {
            case 'groceries':
                newRow.groceries += amount;
                break;
            case 'gas':
                newRow.gas += amount;
                break;
            case 'entertainment':
                newRow.entertainment += amount;
                break;
            case 'rent':
                newRow.rent += amount;
                break;
        }
        setRow(newRow);
    };

    return (
        <div>
            <p>Weekly Screen</p>
            <DropdownWithInput options={categories} onAddExpense={handleAddExpense}/>
            <Table row={row}/>
        </div>
    )
}