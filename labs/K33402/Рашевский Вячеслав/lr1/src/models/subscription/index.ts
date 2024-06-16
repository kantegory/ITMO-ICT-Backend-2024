import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript'
import {SubscriptionController} from "../../controllers/subscription/index.js";

@Table
export class Subscription extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    identifier: number

    @Column
    name: string

    @Column
    amount_left: number
}
