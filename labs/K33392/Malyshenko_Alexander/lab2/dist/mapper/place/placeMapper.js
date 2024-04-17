"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceMapper {
    placeToDict(entity) {
        return {
            id: entity.id,
            city_id: entity.city_id,
            name: entity.name,
            description: entity.description,
            rating: entity.rating,
            amount_of_rates: entity.amount_of_rates,
        };
    }
}
exports.default = PlaceMapper;
