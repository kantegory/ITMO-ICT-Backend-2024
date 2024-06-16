import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'

@Table
class User extends Model {
    @Column
    firstname: string

    @Column
    lastname: string

    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string
}

export default User