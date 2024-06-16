"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TravelUserLinkMapper {
    travelUserLinkToDict(entity) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            travel_id: entity.travel_id,
            seats: entity.seats,
            status: entity.status,
        };
    }
}
exports.default = TravelUserLinkMapper;
