"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CountryMapper {
    countryToDict(entity) {
        return {
            id: entity.id,
            name: entity.name,
            main_language: entity.main_language,
        };
    }
}
exports.default = CountryMapper;
