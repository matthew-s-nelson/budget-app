function sum(expenseRows, type) {
    let sum = 0;
    expenseRows.forEach(row => {
        if (row.type == type) {
            sum += row.amount;
        }
    });
    return sum;
}

export function sumIncome(expenseRows) {
    return sum(expenseRows, 'income');
}

export function sumExpenses(expenseRows) {
    return sum(expenseRows, 'expense');
}