import hashPassword from "../../utils/password/hash";
import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export type UserAttributes = {
  id: Number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserCreationAttributes = Optional<UserAttributes, "id">;

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: Number;

  @AllowNull(false)
  @Column
  firstname: string;

  @Column
  lastname: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static generatePasswordHash(instance: User) {
    const { password } = instance;
    if (instance.changed("password")) {
      instance.password = hashPassword(password);
    }
  }
}

export default User;
