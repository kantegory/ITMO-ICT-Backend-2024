import Mapper from "../Mapper";
import {User} from "../../models/users/User";
import {ReturnUserDto} from "../../dtos/users/UserDto";

class UserMapper implements Mapper<User> {
    toDto(entity: User): ReturnUserDto {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email
        };
    }

}

export default UserMapper;