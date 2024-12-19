export class Expense {
    private _id: string;
    private _category_id: string;
    private _description: string;
    private _amount: number;
    private _type: string;
    private _date: Date;

    public constructor(
        id: string,
        category_id: string,
        description: string,
        amount: number,
        type: string,
        date: Date
    ) {
        this._id = id;
        this._category_id = category_id;
        this._description = description;
        this._amount = amount;
        this._type = type;
        this._date = date;
    }

    public get id(): string {
        return this._id;
    }

    public get category_id(): string {
        return this._category_id;
    }

    public get description(): string {
        return this._description;
    }

    public get amount(): number {
        return this._amount;
    }

    public get type(): string {
        return this._type;
    }

    public get date(): Date {
        return this._date;
    }
}