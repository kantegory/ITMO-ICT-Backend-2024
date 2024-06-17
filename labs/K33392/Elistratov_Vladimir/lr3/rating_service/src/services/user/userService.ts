import sequelize from "../../database/database";
import { User, UserCreate } from "../../models/user/User";
import { Repository } from "sequelize-typescript";
import { CrudUserInterface } from "./IUserService";
import { RatingAdd } from "../../models/rating/Rating";


class UserService implements CrudUserInterface{
    private userRepository: Repository<User> = sequelize.getRepository(User);
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne<User>({ where: { email } })
    }

    async addRating(id: number, data: RatingAdd) {
        await this.userRepository.update(data, {
            where: {
                id: id
            }
        })
    }
}

export default UserService;