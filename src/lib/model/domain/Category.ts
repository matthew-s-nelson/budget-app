export class Category {
    private _id: string;
    private _name: string;
    private _annual_budget: number;

    public constructor(
        id: string,
        name: string,
        annual_budget: number
    ) {
        this._id = id;
        this._name = name;
        this._annual_budget = annual_budget;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get annual_budget(): number {
        return this._annual_budget;
    }
}