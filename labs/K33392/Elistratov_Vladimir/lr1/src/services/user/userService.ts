import sequelize from "../../db/connection";
import { CrudService } from "../CRUDService";
import { User, UserCreate } from "../../models/user/User";
import { Repository } from "sequelize-typescript";


class UserService implements CrudService<number, User, UserCreate> {
    private userRepository: Repository<User> = sequelize.getRepository(User);
    create(data: UserCreate): Promise<User> {
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

    async list(): Promise<Array<User> | null> {
        return this.userRepository.findAll()
    }

    async updateById(id: number, data: UserCreate): Promise<User> {
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