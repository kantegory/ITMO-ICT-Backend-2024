import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, DataType, IsEmail, HasMany } from 'sequelize-typescript'
import {hashSync} from 'bcrypt'
import ShoppingCartItem from './shopping_cart_item'
import Item from './product'

@Table
class User extends Model {

    @Column(DataType.STRING)
    name: string

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column(DataType.STRING)
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @HasMany(() => ShoppingCartItem, 'userId')
    shoppingCartItems: Item[]

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashSync(password, 5)

        }
    }
}

export default User