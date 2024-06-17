import { Table, Column, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, Model} from "sequelize-typescript";
// import User from "../users";
import Product from "../product";
import { Optional } from "sequelize";
import { Col } from "sequelize/types/utils";


export type BasketAtributes = {
    id: number,
    // user: User,
    userId: number,
    userName:string,
    product: Product,
    productId: number,
    productName: string,
    count: number,
};

export type BasketCreationAtributes = Optional<BasketAtributes, 'product'>


@Table

export class Basket extends Model<BasketAtributes, BasketCreationAtributes> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    // @ForeignKey(() => User)
    // @Column
    // userId: number

    // @BelongsTo(() => User)
    // user: User;

    @Column
    userName:string

    @ForeignKey(() => Product)
    @Column
    productId: number

    @BelongsTo(() => Product)
    product: Product;

    @Column
    productName: string

    @Column
    count: number
};

export default Basket