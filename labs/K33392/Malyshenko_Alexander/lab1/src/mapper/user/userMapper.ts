import { User } from "../../models/user/User"

class UserMapper {
    userToDict(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}

export default UserMapper;