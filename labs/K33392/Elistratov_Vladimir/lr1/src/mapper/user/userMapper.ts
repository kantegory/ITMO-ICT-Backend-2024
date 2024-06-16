import { User } from "../../models/user/User"

class UserMapper {
    userToDict(entity: User) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email
        };
    }
}

export default UserMapper;