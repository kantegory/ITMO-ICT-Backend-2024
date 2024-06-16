import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript'
  
@Table({
    timestamps: true,
    paranoid: true,
})
export class Customer extends Model {
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number
  
    @Column
    declare firstName: string
  
    @Column
    declare lastName: string
  
    @Column
    declare bio: string
}