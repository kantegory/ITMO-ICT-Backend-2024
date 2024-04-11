import 'bcrypt'
import User from '../models/user'
import { NotUniqueError, UserNotFound, ValidationError } from '../errors/user_errors'


class UserService {

    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id)
        if (user) {
            return user.toJSON()
        } else {
            throw new UserNotFound(`User with id of ${id} doesn't exist`)
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
            switch (error.name) {
                case "SequelizeUniqueConstraintError": 
                    throw new NotUniqueError("User with this email already exists")
                case "SequelizeValidationError":
                    throw new ValidationError("User's data was given incorrectly")
            }
        }
    }

    async getByEmail(email: string): Promise<User> {
        const user = await User.findOne({ where: { email: email }})
        if (user) {
            return user
        } else {
            throw new UserNotFound("There are no users with this email")
        }
    }


}

export default UserService