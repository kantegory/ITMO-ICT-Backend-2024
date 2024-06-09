import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript'
import { User } from './user.js'
import { Product } from './product.js'

@Table
export class Sale extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number

    @ForeignKey(() => User)
    @Column
    declare userId: number

    @ForeignKey(() => Product)
    @Column
    declare productId: number

    @Column
    declare quantity: number

    @Column
    declare totalPrice: number

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Product)
    product: Product
}
