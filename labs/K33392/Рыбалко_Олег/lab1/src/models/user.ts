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
export class User extends Model {
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
  declare passwordHash: string

  @Column
  declare email: string

  @Default(false)
  @Column
  declare isAdmin: boolean
}

