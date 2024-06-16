"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMapper {
    userToDict(entity) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email
        };
    }
}
exports.default = UserMapper;
