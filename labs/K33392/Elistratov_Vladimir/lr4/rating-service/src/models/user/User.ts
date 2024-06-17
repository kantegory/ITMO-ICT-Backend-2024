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
    rating: number,
    amount_of_rates: number,
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @Unique
    @AllowNull(false)
    @Column
    email!: string

    @Column
    rating!: number

    @Column
    amount_of_rates!: number
}

export default User