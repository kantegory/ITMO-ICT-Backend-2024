import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'books' })
export class Book extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    author!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price!: number;
}
