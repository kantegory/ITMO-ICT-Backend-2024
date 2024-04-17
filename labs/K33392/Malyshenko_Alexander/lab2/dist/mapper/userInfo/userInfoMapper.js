"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInfoMapper {
    userInfoToDict(entity) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            main_info: entity.main_info,
            firstname: entity.firstname,
            lastname: entity.lastname,
            age: entity.age,
            phone_number: entity.phone_number,
        };
    }
}
exports.default = UserInfoMapper;
