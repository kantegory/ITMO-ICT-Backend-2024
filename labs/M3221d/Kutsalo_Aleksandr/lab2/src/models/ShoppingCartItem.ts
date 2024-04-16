import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./User";
import Item from "./Item";

@Table
class ShoppingCartItem extends Model {

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number

    @BelongsTo(() => User, 'userId')
    user: User

    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId: number

    @Column(DataType.INTEGER)
    quantity: number

    @BelongsTo(() => Item, 'itemId')
    item: Item

}


export default ShoppingCartItem