import { Table, Column, Model, AllowNull, Default } from 'sequelize-typescript'

@Table
class ExchangeRequest extends Model {
    @AllowNull(false)
    @Column
    applicantId: number

    @AllowNull(false)
    @Column
    bookId: number

    @Default(true)
    @Column
    isActive: boolean
}

export default ExchangeRequest