import {CrudService} from "../CrudService";
import {User, UserCreationAttributes} from "../../models/users/User";
import {Repository} from "sequelize-typescript";
import sequelize from "../../db/db";

class UserService implements CrudService<number, User, UserCreationAttributes> {
    private userRepository: Repository<User> = sequelize.getRepository(User);
    create(data: UserCreationAttributes): Promise<User> {
        try {
            return this.userRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.userRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async updateById(id: number, data: UserCreationAttributes): Promise<User> {
        const result = await this.userRepository.update(data, {
            where: {
                id: id
            },
            returning: true
        });
        if (result[0] === 0) {
            return Promise.reject({message: "Not found"});
        }

        return Promise.resolve(result[1][0]);
    }


}

export default UserService;