export type Category = {
    id: string;
    name: string;
    annual_budget: number;
};

export type Expense = {
    id: string;
    category_id: string;
    description: string;
    amount: number;
    type: string;
    date: Date;
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}