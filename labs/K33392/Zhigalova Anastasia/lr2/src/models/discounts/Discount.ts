import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { Product } from "../products/Product";


@Table({
  tableName: 'Discounts'
})
export class Discount extends Model<Discount> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    description: string;

    @AllowNull(false)
    @Column
    percentage: number;

    @Column(DataType.DATE)
    startDate: Date;

    @Column(DataType.DATE)
    endDate: Date;

    @HasMany(() => Product)
    products: Product[];
}
