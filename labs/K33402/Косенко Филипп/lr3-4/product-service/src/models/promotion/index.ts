import { Table, Column, PrimaryKey, AutoIncrement, Unique, ForeignKey, BelongsTo, Model } from "sequelize-typescript";
import { Optional } from "sequelize";
import Product from "../product";

export type PromotionAtributs = {
    id: number,
    name: string,
    des: string,
    productId: number,
    product: Product,
};

export type PromotionAtributsConstrukt = Optional<PromotionAtributs, 'productId' | 'product'>;

@Table
export class Promotion extends Model<PromotionAtributs, PromotionAtributsConstrukt> {

    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    
    @Unique
    @Column
    name: string

    @Column
    des:string

   
    @ForeignKey((): any => Product)
    @Column
    productId: number

    @BelongsTo((): any => Product)
    product: Product
}

export default Promotion