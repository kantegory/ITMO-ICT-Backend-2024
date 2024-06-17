import { Table, Column, Model, Unique, AllowNull, DataType, HasMany, AutoIncrement, PrimaryKey, Scopes } from 'sequelize-typescript'
import { Optional } from "sequelize";

// import Promotion from '../promotion';


export type CurrencyAtributes = {
    id: number,
    name: string,
    price: number,
    category: CategoryName,
    lattestPrice: number
};

export enum CategoryName {
    TOKEN = "TOKEN",
    STABLECOIN = "STABLECOIN",
};

export type CurrancyCreationAttributes = Optional<CurrencyAtributes, 'id'>;

@Table
export class Currency extends Model<CurrencyAtributes, CurrancyCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Column
    price: number;


    @Column({
        type: DataType.ENUM(...Object.values(CategoryName)),
        defaultValue: CategoryName.TOKEN,
    })
    category: CategoryName;

}

export default Currency