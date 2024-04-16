import { AllowNull, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Tag from "./Tag";
import ItemTag from "./ItemTag";


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

    @BelongsToMany(() => Tag, () => ItemTag)
    tags: Tag[]

    @Column(DataType.INTEGER)
    quantity: number
}

export default Item