import { City } from "../../models/city/City"

class CityMapper {
    cityToDict(entity: City) {
        return {
            id: entity.id,
            country_id: entity.country_id,
            name: entity.name,
            description: entity.description
        };
    }
}

export default CityMapper