import sequelize from "../../../database/database";
import { UserComment, UserCommentCreate } from "../../../models/comment/UserComment";
import { Repository } from "sequelize-typescript";
import { CrudUserCommentInterface } from "./IUserCommentService";


class UserCommentService implements CrudUserCommentInterface<number> {
    private userCommentRepository: Repository<UserComment> = sequelize.getRepository(UserComment);
    create(data: UserCommentCreate): Promise<UserComment> {
        try {
            return this.userCommentRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.userCommentRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<UserComment | null> {
        return this.userCommentRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByUserId(user_id: number): Promise<UserComment | null> {
        return this.userCommentRepository.findOne({
            where: {
                id: user_id
            }
        });
    }

    async findAll(): Promise<Array<UserComment> | null> {
        return this.userCommentRepository.findAll()
    }

    async updateById(id: number, data: UserCommentCreate): Promise<UserComment> {
        const result = await this.userCommentRepository.update(data, {
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

export default UserCommentService;