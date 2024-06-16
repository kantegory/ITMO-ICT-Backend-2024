import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class Book extends Model {
    @Column
    title: string

    @AllowNull(false)
    @Column({
        type: DataTypes.INTEGER, 
        validate: {
            isInt: true
        }
    })
    ownerId: number

    @Column
    description: string
}

export default Book