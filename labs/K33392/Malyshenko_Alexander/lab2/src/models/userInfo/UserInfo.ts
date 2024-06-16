import {Table, Column, Model, ForeignKey, AllowNull} from "sequelize-typescript"
import { Optional } from "sequelize";
import User from "../user/User";

export type UserInfoAttributes = {
    id: number,
    user_id: number,
    main_info: string,
    firstname: string,
    lastname: string,
    age: number,
    phone_number: string,
}

export type UserInfoCreate = Optional<UserInfoAttributes, "id">

@Table
export class UserInfo extends Model<UserInfoAttributes, UserInfoCreate> {
    @ForeignKey(() => User)
    @Column
    user_id!: number

    @Column
    main_info!: string

    @AllowNull(false)
    @Column
    firstname!: string

    @AllowNull(false)
    @Column
    lastname!: string

    @Column
    age!: number

    @Column
    phone_number!: string
}

export default UserInfo