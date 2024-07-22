export type Category = {
    id: string;
    name: string;
};

export type Expense = {
    id: string;
    category_id: string;
    description: string;
    amount: number;
    type: 'expense' | 'income';
    date: Date;
}