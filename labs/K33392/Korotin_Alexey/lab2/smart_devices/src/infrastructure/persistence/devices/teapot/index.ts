import {BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ProfileModel} from "../../profile";
import {NonAttribute} from "sequelize";
import {TeapotState} from "../../../../domain/devices/teapot";
import {EventSubscriptionModel} from "../../event_subscriptions";
import {TeapotSubscriptionModel} from "./subscription/TeapotSubscription";


@Table
export class TeapotModel extends Model {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string;

    @Column
    declare name: string;

    @BelongsTo(() => ProfileModel, 'profile_id')
    declare profile: NonAttribute<ProfileModel>;

    @Column(DataType.UUID)
    declare profileId: string;

    @Column(DataType.INTEGER)
    declare temperature: number;

    @Column(DataType.DOUBLE)
    declare capacity: number;

    @Column(DataType.DOUBLE)
    declare waterSupply: number;

    @Column(DataType.ENUM(...Object.keys(TeapotState)))
    declare state: TeapotState;

    @HasMany(() => TeapotSubscriptionModel, 'teapotId')
    declare subscriptions: NonAttribute<TeapotSubscriptionModel[]>
}
