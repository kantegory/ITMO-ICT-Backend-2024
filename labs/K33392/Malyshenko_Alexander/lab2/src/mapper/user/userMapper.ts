import { User } from "../../models/user/User"

class UserMapper {
    userToDict(entity: User) {
        return {
            id: entity.id,
            homeland_id: entity.homeland_id,
            email: entity.email,
            password: entity.password,
            rating: entity.rating,
            amount_of_rates: entity.amount_of_rates,
        };
    }
}

export default UserMapper