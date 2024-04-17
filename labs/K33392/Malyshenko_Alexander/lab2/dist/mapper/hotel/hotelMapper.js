"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HotelMapper {
    hotelToDict(entity) {
        return {
            id: entity.id,
            city_id: entity.city_id,
            stars: entity.stars,
            rating: entity.stars,
            amount_of_rates: entity.amount_of_rates,
        };
    }
}
exports.default = HotelMapper;
