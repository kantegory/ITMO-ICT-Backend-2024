import { Table, Column, Model, Unique, AllowNull, DataType, HasMany, AutoIncrement, PrimaryKey, Scopes } from 'sequelize-typescript'
import { Optional } from "sequelize";

// import Promotion from '../promotion';


export type ProductAtributes = {
    id: number,
    name: string,
    price: number,
    sail: number,
    quantity: number,
    category: CategoryName,
    des: string,
};

export enum CategoryName {
    SHIRT = "SHIRT",
    SHORTS = "SHORTS",
    SWEATER = "SWEATER",
    TROUSERS = "TROUSERS",
};

export type ProducCreationAttributes = Optional<ProductAtributes, 'id'>;

@Table
export class Product extends Model<ProductAtributes, ProducCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Column
    price: number;

    @Column
    sail: number;

    
    @Column
    quantity: number;


    @Column({
        type: DataType.ENUM(...Object.values(CategoryName)),
        defaultValue: CategoryName.SHIRT,
    })
    category: CategoryName;

    
    @Column
    des: string;

    
}

export default Product