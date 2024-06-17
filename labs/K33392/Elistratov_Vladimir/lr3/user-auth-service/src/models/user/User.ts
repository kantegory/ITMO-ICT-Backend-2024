import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
} from "sequelize-typescript"
import PasswordHandler from "../../utils/PasswordHandler"
import { Optional } from "sequelize";
import {toString} from "validator";

export type UserAttributes = {
    id: number,
    email: string,
    password: string,
}

export type UserUpdatePassword = {
    email: string,
    password: string,
    new_password: string,
}

export type UserUpdateHomelandReq = {
    email: string,
    homeland_id: number,
}

export type UserUpdateHomeland = {
    homeland_id: number,
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @Column
    homeland_id!: number

    @Unique
    @AllowNull(false)
    @Column
    email!: string

    @AllowNull(false)
    @Column
    password!: string

    @Column
    rating!: number

    @Column
    amount_of_rates!: number
}

export default User