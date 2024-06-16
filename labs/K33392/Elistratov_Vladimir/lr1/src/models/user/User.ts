import { Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import PasswordHandler from "../../utils/PasswordHandler"
import { Optional } from "sequelize";

export type UserAttributes = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type UserCreate = Optional<UserAttributes, "id">

@Table
export class User extends Model<UserAttributes, UserCreate> {
    @AllowNull(false)
    @Column
    name!: string

    @Unique
    @AllowNull(false)
    @Column
    email!: string

    @AllowNull(false)
    @Column
    password!: string

    @BeforeCreate
    @BeforeUpdate
    static hashPassword(instance: User) {
        const handler = new PasswordHandler()
        const { password } = instance
        if (instance.changed("password")) {
            instance.password = handler.hashPassword(password)
        }
    }
}

export default User