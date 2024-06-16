import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'orders' })
export class Order extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    bookId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    status!: string;
}
