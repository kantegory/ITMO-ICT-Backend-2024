import {Entity} from "../meta";
import {EmailAddress} from "./EmailAddress";

export enum AccountRole {
    USER,
    ADMIN,
    VERIFIER
}

export enum AccountStatus {
    NEW,
    VERIFIED,
    INACTIVE
}

export class Account implements Entity<string> {
    private _role: AccountRole;
    private _status: AccountStatus;

    public constructor(public id: string, private _email: EmailAddress,
                       private _password: string, role?: AccountRole, status?: AccountStatus) {
        this._role = role ?? AccountRole.USER;
        this._status = status ?? AccountStatus.NEW;
    }


    get role(): AccountRole {
        return this._role;
    }

    get status(): AccountStatus {
        return this._status;
    }

    get email(): EmailAddress {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    public equals(other: Entity<string>): boolean {
        return this.id === other.id;
    }
}