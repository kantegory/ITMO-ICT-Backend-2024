import UserInfo from "../../models/userInfo/UserInfo";

class UserInfoMapper {
    userInfoToDict(entity: UserInfo) {
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

export default UserInfoMapper