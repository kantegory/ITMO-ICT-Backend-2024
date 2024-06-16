import { Hotel } from "../../models/hotel/Hotel"

class HotelMapper {
    hotelToDict(entity: Hotel) {
        return {
            id: entity.id,
            city_id: entity.city_id,
            stars: entity.stars,
            rating: entity.stars,
            amount_of_rates: entity.amount_of_rates,
        };
    }
}

export default HotelMapper