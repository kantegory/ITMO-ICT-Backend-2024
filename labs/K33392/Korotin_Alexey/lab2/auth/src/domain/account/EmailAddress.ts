import {ValueObject} from "../meta";

export class EmailAddress implements ValueObject {
    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    constructor(value: string) {
        if (!EmailAddress.isEmail(value)) {
            throw new InvalidEmailException(`'${value}' is not a valid email`);
        }

        this._value = value;
    }

    private static isEmail(candidate: string): boolean {
        const emailRegex: string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        const matches = candidate.match(emailRegex) || [];
        return matches.length === 1;
    }

    public equals(other: EmailAddress): boolean {
        return this.value === other.value;
    }
}

export class InvalidEmailException extends Error {
    constructor(message: string) {
        super(message);
    }
}