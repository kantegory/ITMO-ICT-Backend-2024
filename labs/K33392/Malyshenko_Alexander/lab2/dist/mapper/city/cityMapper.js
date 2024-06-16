"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CityMapper {
    cityToDict(entity) {
        return {
            id: entity.id,
            country_id: entity.country_id,
            name: entity.name,
            description: entity.description
        };
    }
}
exports.default = CityMapper;
