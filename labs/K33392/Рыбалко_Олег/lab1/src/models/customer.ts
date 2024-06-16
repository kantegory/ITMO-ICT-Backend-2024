import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript'

@Table
export class Customer extends Model {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column
  declare firstName: string

  @Column
  declare lastName: string

  @Column
  declare info: string
}

