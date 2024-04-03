import 'bcrypt'
import User from '../models/user'
import { error } from 'console'


class UserService {

    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id)
        if (user) {
            return user.toJSON()
        } else {
            throw new Error()
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await User.findAll()
        if (users) {
            return users
        } else {
            throw new Error()
        }
    }
    
    async createUser(userBody: any): Promise<User> {
        try {
            const user = await User.create(userBody)

            return user.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }


}

export default UserService