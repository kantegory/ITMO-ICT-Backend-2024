import { User } from '../../models/User.js'
import { BaseService } from '../base/Base.js'

export class UserService extends BaseService<User> {
    findByEmail = async (email: string): Promise<User | null> => {
        return await this.model.findOne({ where: { email: email } })
    }
}