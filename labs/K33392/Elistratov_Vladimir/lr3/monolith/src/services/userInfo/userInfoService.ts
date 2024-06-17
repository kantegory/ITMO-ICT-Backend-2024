import sequelize from "../../database/database";
import { UserInfo, UserInfoCreate } from "../../models/userInfo/UserInfo";
import { Repository } from "sequelize-typescript";
import { CrudUserInfoInterface } from "./IUserInfoService";


class UserInfoService implements CrudUserInfoInterface<number> {
    private userInfoRepository: Repository<UserInfo> = sequelize.getRepository(UserInfo);
    create(data: UserInfoCreate): Promise<UserInfo> {
        try {
            return this.userInfoRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.userInfoRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<UserInfo | null> {
        return this.userInfoRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByUserId(user_id: number): Promise<UserInfo | null> {
        return this.userInfoRepository.findOne({
            where: {
                id: user_id
            }
        });
    }

    async findAll(): Promise<Array<UserInfo> | null> {
        return this.userInfoRepository.findAll()
    }

    async updateById(id: number, data: UserInfoCreate): Promise<UserInfo> {
        const result = await this.userInfoRepository.update(data, {
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

export default UserInfoService;