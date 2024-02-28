import Mapper from "../Mapper";
import {User} from "../../models/users/User";
import Dto from "../../dtos/Dto";

class UserMapper implements Mapper<User> {
    toDto(entity: User): Dto<User> {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email
        };
    }

}

export default UserMapper;