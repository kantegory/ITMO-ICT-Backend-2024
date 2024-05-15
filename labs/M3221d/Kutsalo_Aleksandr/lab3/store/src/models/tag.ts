import {AllowNull, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import ItemTag from "./ItemTag";
import Item from "./Item";

@Table
class Tag extends Model {
    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @BelongsToMany(() => Item, () => ItemTag)
    items: Item[]

}

export default Tag