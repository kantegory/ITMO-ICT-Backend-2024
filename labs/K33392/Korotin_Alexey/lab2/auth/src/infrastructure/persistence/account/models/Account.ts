import {Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {AccountRole, AccountStatus} from "../../../../domain/account/Account";
import {AccountCreateAttributes, AccountRestoreAttributes} from "../../../../domain/account/Attributes";


@Table
export class Account extends Model<AccountRestoreAttributes, AccountCreateAttributes> {
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
