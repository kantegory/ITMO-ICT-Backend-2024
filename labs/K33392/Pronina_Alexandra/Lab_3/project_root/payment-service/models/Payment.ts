import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'payments' })
export class Payment extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amount!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    status!: string;
}
