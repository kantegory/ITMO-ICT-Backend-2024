import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;
}
