import 'bcrypt'
import User from '../models/User'
import { NotUniqueError, UserNotFound, ValidationError } from '../errors/userErrors'
import sequelize from '../instances/db'
import { Repository } from 'sequelize-typescript';

class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = sequelize.getRepository(User)
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findByPk(id)
        if (user) {
            return user.toJSON()
        } else {
            throw new UserNotFound(`User with id of ${id} doesn't exist`)
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll()
        if (users) {
            return users
        } else {
            throw new Error()
        }
    }
    
    async createUser(userBody: any): Promise<User> {
        try {
            const {name, email, password} = userBody
            const user = await this.userRepository.create({name: name,
                email: email,
                password: password})
            // console.log(user.toJSON())
            return user.toJSON()
        } catch (error) {
            switch (error.name) {
                case "SequelizeUniqueConstraintError":
                    console.log("User with this email already exists")
                    break
                case "SequelizeValidationError":
                    console.log("User's data was given incorrectly")
                    break
            }
        }
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: email }})
        if (user) {
            return user
        } else {
            throw new UserNotFound("There are no users with this email")
        }
    }


}

export default UserService