import {Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table
export class EventSubscriptionModel extends Model {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string;

    @Column
    declare eventType: string

    @Column
    declare discriminatorValue: string
}