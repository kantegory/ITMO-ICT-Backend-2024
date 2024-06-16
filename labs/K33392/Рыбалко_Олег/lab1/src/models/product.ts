import {
  Unique,
  PrimaryKey,
  AutoIncrement,
  Table,
  Column,
  Model,
} from 'sequelize-typescript'

@Table
export class Product extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  declare name: string

  @Column
  declare quantity: number

  @Column
  declare price: number

  @Column
  declare imageUrl: string
}

