import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    PrimaryKey,
    AutoIncrement
} from 'sequelize-typescript'

@Table
class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: Number
    @Column
    firstName: string
    @Column
    lastName: string

    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string
}

export default User