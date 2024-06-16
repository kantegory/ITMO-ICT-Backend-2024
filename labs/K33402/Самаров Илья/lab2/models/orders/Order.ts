import User from "../users/User";
import Product from "../products/Product";
import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export type OrderAttributes = {
  id: Number;
  productId: string;
  userId: string;
  count: Number;
};

export type OrderCreationAttributes = Optional<OrderAttributes, "id">;

@Table
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: Number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column
  declare productId: string;

  @BelongsTo(() => Product)
  declare product: Product;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  declare userId: string;
  @BelongsTo(() => User)
  declare user: Product;

  @AllowNull(false)
  @Column
  declare count: Number;
}

export default Order;
