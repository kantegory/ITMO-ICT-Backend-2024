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
export class Product extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string

    @Column
    description: string

    @Column
    price: number

    @Column
    quantity: number

    @Column
    imageUrl: string
}