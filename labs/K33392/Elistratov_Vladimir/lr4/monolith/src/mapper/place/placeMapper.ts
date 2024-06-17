import Place from "../../models/place/Place";

class PlaceMapper {
    placeToDict(entity: Place) {
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

export default PlaceMapper