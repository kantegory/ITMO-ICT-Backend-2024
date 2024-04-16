import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Item from "./Item";
import Tag from "./Tag";

@Table
class ItemTag extends Model {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId: number

    @ForeignKey(() => Tag)
    @Column(DataType.INTEGER)
    tagId: number

    @BelongsTo(() => Item)
    item: Item

    @BelongsTo(() => Tag)
    tag: Tag
}

export default ItemTag