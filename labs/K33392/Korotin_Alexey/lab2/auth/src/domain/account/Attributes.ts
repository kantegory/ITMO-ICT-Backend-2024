import {AccountRole, AccountStatus} from "./Account";


export type AccountRestoreAttributes = {
    id: string;
    email: string;
    password: string;
    role: AccountRole;
    status: AccountStatus;
};


export type AccountCreateAttributes = Pick<AccountRestoreAttributes, 'email' | 'password'>;