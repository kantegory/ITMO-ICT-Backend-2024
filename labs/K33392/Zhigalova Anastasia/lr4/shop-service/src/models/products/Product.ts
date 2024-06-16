import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, ForeignKey  } from 'sequelize-typescript';
import { Order } from "../orders/Order";
import { Discount } from "../discounts/Discount";
import { Promotion } from "../promotions/Promotion";

@Table({
  tableName: 'Products'
})
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    price: number;

    @Column
    stockQuantity: number;

    @ForeignKey(() => Discount)
    @Column
    discountId?: number;

    @ForeignKey(() => Promotion)
    @Column
    promotionId?: number; 

    @HasMany(() => Order)
    orders: Order[];
}
