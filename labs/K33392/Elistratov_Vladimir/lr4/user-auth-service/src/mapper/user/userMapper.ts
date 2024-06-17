import { User } from "../../models/user/User"

class UserMapper {
    userToDict(entity: User) {
        return {
            id: entity.id,
            email: entity.email,
            password: entity.password,
        };
    }
}

export default UserMapper