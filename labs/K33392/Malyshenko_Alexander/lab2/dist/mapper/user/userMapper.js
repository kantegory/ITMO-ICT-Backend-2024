"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMapper {
    userToDict(entity) {
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
exports.default = UserMapper;
