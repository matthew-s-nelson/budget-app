export function sum(expenseRows, type = null) {
    let sum = 0;
    expenseRows.forEach(row => {
        if (type == null) {
            if (row.type == 'income') {
                sum += row.amount;
            } else {
                sum -= row.amount;
            }
        } else if (row.type == type) {
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

export function findAverage(expenseRows, periods) {
    let sum = 0;
    expenseRows.forEach(row => {
        sum += row;
    });
    return sum / periods.length;
}