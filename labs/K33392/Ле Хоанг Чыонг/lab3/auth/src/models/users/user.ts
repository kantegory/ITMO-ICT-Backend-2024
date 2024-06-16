import hashPassword from '../../utils/hashPassword'
import {Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate ,PrimaryKey, DataType, BelongsToMany} from 'sequelize-typescript'
import {Optional} from "sequelize";

export type UserAttributes = {
  id: string,
  name: string,
  email : string ;
  password : string;
  activities: string[];
  locations: string[];
};

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;


@Table 
export class User extends Model<UserAttributes,UserCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id : string;

    @Column
    name: string;
    
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
        defaultValue: []
    })
    activities: string[];

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
        defaultValue: []
    })
    locations: string[];
}

export default User
