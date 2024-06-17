import { Table, Column, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, Model} from "sequelize-typescript";
// import User from "../users";
import Currency from "../currency";
import { Optional } from "sequelize";



export type BalanceAtributes = {
    id: number,
    userId: number,
    userName:string,
    currency: string,
    currencyId: number,
    count: number,
};

export type BalanceCreationAtributes = Optional<BalanceAtributes, 'id'>


@Table

export class Balance extends Model<BalanceAtributes, BalanceCreationAtributes> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    userId: number;

    @Column
    userName:string;

    @ForeignKey(() => Currency)
    @Column
    currencyId: number;

    @Column
    currency: string;

    @Column
    count: number;
};

export default Balance