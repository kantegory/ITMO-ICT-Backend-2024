import {
    Column,
    Unique,
    AllowNull, HasOne, Table,
} from 'sequelize-typescript'
import BaseModel from "./base";
import UserProfile from "./userProfile";

@Table({
    tableName: 'users'
})
class User extends BaseModel {
    @Column
    firstName: string
    @Column
    lastName: string
    @Unique
    @Column
    email: string
    @AllowNull(false)
    @Column
    password: string

    @HasOne(() => UserProfile)
    profile: UserProfile|null

    async fetchProfile() : Promise<UserProfile|null> {
        return await this.$get('profile')
    }
}

export default User