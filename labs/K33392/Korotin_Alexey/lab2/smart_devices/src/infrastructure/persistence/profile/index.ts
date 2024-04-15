import {BelongsTo, Column, DataType, HasOne, Model, PrimaryKey, Table} from "sequelize-typescript";
import {AccountModel} from "../account";
import {NonAttribute} from "sequelize";


@Table
export class ProfileModel extends Model {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare location: string;

    @BelongsTo(() => AccountModel, 'user_id')
    declare user: NonAttribute<AccountModel>;

    @Column(DataType.UUID)
    declare userId: string
}