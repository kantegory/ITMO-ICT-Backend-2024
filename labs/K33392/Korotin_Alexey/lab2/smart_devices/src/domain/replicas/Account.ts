import {Entity} from "../meta";

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
    public constructor(public id: string, public email: string, public password: string,
                       public role: AccountRole, public status: AccountStatus) {
    }

    public equals(other: Entity<string>): boolean {
        return this.id === other.id;
    }
}