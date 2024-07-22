'use client'

import { fetchExpenses } from "@/app/lib/expenses/data";
import DataScreen from "@/app/ui/budget_data/DataScreen";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

export default function Page() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchExpenses();
            setTransactions(data);
          } catch (error) {
            console.error('An error occurred while fetching expenses:', error);
          }
        }
    
        fetchData();
      }, []);

    return (
        <div>
            <p>Yearly budget</p>
            <DataScreen transactions={transactions} />
        </div>
    );
}