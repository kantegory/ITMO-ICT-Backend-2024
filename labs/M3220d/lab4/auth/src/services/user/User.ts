import User from '../../models/user/User'
import UserError from '../../errors/user/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
    async isExist(id: number) : Promise<boolean> {
        const user = await User.findByPk(id)

        if (user) return true

        return false
    }

    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')
    }

    async getAll() : Promise<User[]> {
        const user = await User.findAll()

        if (user) return user

        throw new UserError('Not found!')
    }

    async create(userData: any) : Promise<User|UserError> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.findOne({ where: { email } })

        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new UserError('Incorrect login/password!')
    }
}

export default UserService