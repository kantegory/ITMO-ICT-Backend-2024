"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransportMapper {
    transportToDict(entity) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            name: entity.name,
            type: entity.type,
            seats: entity.seats,
        };
    }
}
exports.default = TransportMapper;
