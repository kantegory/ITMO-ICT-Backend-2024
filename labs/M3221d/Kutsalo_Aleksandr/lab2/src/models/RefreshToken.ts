import { AllowNull, BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import User from "./User";
import { config } from "dotenv";

config()

@Table
class RefreshToken extends Model {

    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    token: string

    @AllowNull(false)
    @Column(DataType.NUMBER)
    userId: number

    @Column(DataType.DATE)
    expirationDate: Date

    @BelongsTo(() => User, 'userId')
    user: User

    @BeforeUpdate
    @BeforeCreate
    static generateData(instance: RefreshToken) {
        instance.expirationDate = new Date(Date.now() + Number(process.env.REFRESH_TOKEN_AGE_MS))
    }
}

export default RefreshToken