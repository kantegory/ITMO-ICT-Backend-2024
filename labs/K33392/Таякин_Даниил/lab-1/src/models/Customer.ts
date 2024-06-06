import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    AutoIncrement,
    Default,
} from 'sequelize-typescript'

@Table({
    timestamps: true,
    paranoid: true,
})
export class Customer extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    email: string

    @Column
    passwordHash: string

    @Column
    firstName: string

    @Column
    lastName: string

    @Default(false)
    @Column
    isAdmin: Boolean
}