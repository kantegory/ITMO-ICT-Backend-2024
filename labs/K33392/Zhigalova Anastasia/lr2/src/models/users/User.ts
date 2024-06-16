import { Table, Column, Model, Unique, AllowNull, HasMany } from 'sequelize-typescript';
import { Order } from "../orders/Order";

@Table({
  tableName: 'Users'
})
export class User extends Model<User> {
    @Column
    name: string

    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @HasMany(() => Order)
    orders: Order[];
}