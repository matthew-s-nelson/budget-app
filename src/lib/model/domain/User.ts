export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;

    public constructor(
        id: string,
        name: string,
        email: string,
        password: string
    ) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }
}