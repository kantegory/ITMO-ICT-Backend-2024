import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
    BeforeCreate,
    BeforeUpdate,
    BelongsToMany,
    ForeignKey
} from "sequelize-typescript"
import PasswordHandler from "../../utils/PasswordHandler"
import { Optional } from "sequelize";
import Travel from "../travel/Travel";
import TravelUserLink from "../links/TravelUserLink";
import Country from "../country/Country";
import {toString} from "validator";

export type UserAttributes = {
    id: number,
    homeland_id: number,
    email: string,
    password: string,
    rating: number,
    amount_of_rates: number,
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @ForeignKey(() => Country)
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

    @BelongsToMany(() => Travel, () => TravelUserLink)
    travels!: Travel[]
}

export default User