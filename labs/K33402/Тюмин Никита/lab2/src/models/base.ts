import {
    Column,
    Model,
    PrimaryKey,
    AutoIncrement
} from 'sequelize-typescript'


class BaseModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number
}

export default BaseModel