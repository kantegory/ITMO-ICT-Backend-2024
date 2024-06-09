import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Default,
} from 'sequelize-typescript'

@Table
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number

    @Column
    declare name: string

    @Column
    declare category: string

    @Column
    declare price: number

    @Default(0)
    @Column
    declare stock: number

    @Default(false)
    @Column
    declare discount: number
}
