"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TravelMapper {
    travelToDict(entity) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            transport_id: entity.transport_id,
            departure_city: entity.departure_city,
            destination_city: entity.destination_city,
            departure_date: entity.departure_date,
            expected_arrival_date: entity.expected_arrival_date,
            actual_arrival_date: entity.actual_arrival_date,
            state: entity.state,
            seats: entity.seats,
        };
    }
}
exports.default = TravelMapper;
