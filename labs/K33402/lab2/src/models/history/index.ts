import { Table, Model, PrimaryKey, AutoIncrement, Column, ForeignKey } from 'sequelize-typescript';
import {Optional} from 'sequelize';
import Currancy from '../currency';

export type HistoryAtributs = {
    id: number,
    idCurrency: number,
    nameCur: string,
    priceCur: number,
};

// export type HistoryCreateAtributs = Optional <HistoryAtributs, 'id' | 'Currancy'>
@Table
export default class History extends Model<HistoryAtributs>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Currancy)
    @Column
    idCurrency: number;

    @Column
    nameCur: string;

    @Column 
    priceCur: number

}