import { BaseService } from '../base/index.js'
import { User } from '../../models/user.js'

export class UsersService extends BaseService<User> {
  findByEmail = async (email: string): Promise<User> => {
    return await this.model.findOne({ where: { email: email } })
  }
}

