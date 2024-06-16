import { UserCreationError, UserNotFound } from "../../error/user/error"
import { User } from "../../models/User"

export class UserService {
    async create(creationData: any): Promise<User> {
      try {
        const user = await User.create(creationData);
        console.log(user)
        return user.toJSON();
      } catch (e) {
        console.error(creationData);
        throw e;
      }
    }
  
    async get(id: number): Promise<User> {
      try {
        const user = await User.findByPk(id);
        return user;
      } catch {
        throw new UserNotFound(
          `User with id=${id} not found}`
        )
      }
    }
  }