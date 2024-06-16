import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'stocks' })
export class Stock extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    bookId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;
}
