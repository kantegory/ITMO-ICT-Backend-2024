import { Table, Column, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, Model} from "sequelize-typescript";
import User from "../users";
import Product from "../product";
import { Optional } from "sequelize";


export type BasketAtributes = {
    id: number,
    user: User,
    userId: number,
    product: Product,
    productId: number
};

export type BasketCreationAtributes = Optional<BasketAtributes, 'product' | 'user'>


@Table

export class Basket extends Model<BasketAtributes, BasketCreationAtributes > {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    countOfProduct: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User;


    // @ForeignKey(() => Product)
    // @Column
    // productId: number

    // @BelongsTo(() => Product)
    // product: Product;
};

export default Basket