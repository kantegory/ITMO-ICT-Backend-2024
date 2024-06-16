import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
  HasMany,
} from "sequelize-typescript";

@Table({
  tableName: "Users",
})
export class User extends Model<User> {
  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
