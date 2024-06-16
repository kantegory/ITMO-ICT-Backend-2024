import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "../products/Product";

@Table({
  tableName: "Orders",
})
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;

  @AllowNull(false)
  @Column
  quantity: number;

  @Column(DataType.DATE)
  orderDate: Date;

  @BelongsTo(() => Product)
  product: Product;
}
