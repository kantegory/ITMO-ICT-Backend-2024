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
export class User extends Model {
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

// helper models

export interface UserCreate {
    email: string
    firstName: string
    lastName: string
    password: string
}

export interface UserLogin {
    email: string
    password: string
}