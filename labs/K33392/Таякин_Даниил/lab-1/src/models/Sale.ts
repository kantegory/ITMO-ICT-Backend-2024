import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    AutoIncrement,
    Default,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript'

import { Product } from './Product.js'

@Table({
    timestamps: true,
    paranoid: true,
})
export class Sale extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string

    @Column
    percent: number

    @Column
    startsAt: Date

    @Column
    endsAt: Date

    @ForeignKey(() => Product)
    @Column
    productID: number

    @BelongsTo(() => Product)
    product: Product
}