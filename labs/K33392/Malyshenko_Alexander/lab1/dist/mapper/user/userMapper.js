"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMapper {
    userToDict(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}
exports.default = UserMapper;
