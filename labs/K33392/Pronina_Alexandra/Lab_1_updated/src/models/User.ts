import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt!: Date;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    updatedAt!: Date;
}
