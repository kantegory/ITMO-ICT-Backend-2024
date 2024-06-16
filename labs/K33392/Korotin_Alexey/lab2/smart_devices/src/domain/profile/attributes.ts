import {Account} from "../replicas/Account";

export type ProfileCreateAttributes = {
    name: string,
    location: string,
    user: Account
}

export type ProfileRestoreAttributes = {
    id: string,
    name: string,
    location: string,
    user: Account
}