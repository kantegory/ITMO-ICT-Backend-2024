import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript'

@Table
class Bear extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number

    @Column(DataType.TEXT)
    name: string

    @Column(DataType.FLOAT)
    honey: number
}

export default Bear