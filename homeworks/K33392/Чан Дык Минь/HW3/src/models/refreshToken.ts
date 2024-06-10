import { Table, Column, Model, Unique, AllowNull, ForeignKey, DataType } from 'sequelize-typescript'
import { Users } from './users'

@Table
class RefreshToken extends Model {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    token!: string

    @ForeignKey(() => Users)
    @Column(DataType.NUMBER)
    userId!: number 
}

export default RefreshToken