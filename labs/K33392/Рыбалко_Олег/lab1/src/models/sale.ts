import {
  Model,
  Table,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript'
import { Product } from './product.js'

@Table
export class Sale extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  declare title: string

  @Column
  declare startsAt: Date

  @Column
  declare percentage: number

  @Column
  declare endsAt: Date | null

  @ForeignKey(() => Product)
  @Column
  declare productID: number

  @BelongsTo(() => Product)
  declare product: Product
}

