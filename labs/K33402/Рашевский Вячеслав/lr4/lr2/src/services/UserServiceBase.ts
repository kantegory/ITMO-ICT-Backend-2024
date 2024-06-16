import { User } from '../models/user.js'

export class UserServiceBase {
    public async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } })
    }

    public async createUser(data: Partial<User>): Promise<User> {
        return await User.create(data)
    }
}
