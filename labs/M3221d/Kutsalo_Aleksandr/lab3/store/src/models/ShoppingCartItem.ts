import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Item from "./Item";

@Table
class ShoppingCartItem extends Model {

    @Column(DataType.INTEGER)
    userId: number

    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId: number

    @Column(DataType.INTEGER)
    quantity: number

    @BelongsTo(() => Item, 'itemId')
    item: Item

}


export default ShoppingCartItem