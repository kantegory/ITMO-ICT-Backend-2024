import {Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {AccountRole, AccountStatus} from "../../../domain/replicas/Account";

@Table
export class AccountModel extends Model {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string

    @Unique
    @Column
    declare email: string

    @Column(DataType.ENUM(...Object.keys(AccountRole)))
    declare role: AccountRole

    @Column(DataType.ENUM(...Object.keys(AccountStatus)))
    declare status: AccountStatus

    @Column
    declare password: string
}