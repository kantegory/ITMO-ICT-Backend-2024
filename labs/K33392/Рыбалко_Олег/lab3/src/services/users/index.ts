import { BaseService } from '../../services/base/index.js'
import { User } from '../../models/user.js'

export class UsersService extends BaseService<User> {
  findByEmail = async (email: string): Promise<User | null> => {
    return await this.model.findOne({ where: { email: email } })
  }
}

