import {BelongsTo, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Col} from "sequelize/types/utils";
import {NonAttribute} from "sequelize";
import {EventSubscriptionModel} from "../../../event_subscriptions";


@Table
export class TeapotSubscriptionModel extends Model {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string

    @Column(DataType.UUID)
    declare teapotId: string

    @Column(DataType.UUID)
    declare subscriptionId: string

    @BelongsTo(() => EventSubscriptionModel, 'subscriptionId')
    declare subscription: NonAttribute<EventSubscriptionModel>
}