import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";


@Table
class Item extends Model {

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @Column(DataType.STRING)
    description: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number

    @AllowNull(false)
    @Column(DataType.STRING)
    imageURL: string

    @Column(DataType.INTEGER)
    quantity: number
}

export default Item