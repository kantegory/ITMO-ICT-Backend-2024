import { Hotel } from "../../models/hotel/Hotel"

class HotelMapper {
    hotelToDict(entity: Hotel) {
        return {
            id: entity.id,
            rating: entity.rating,
            amount_of_rates: entity.amount_of_rates,
        };
    }
}

export default HotelMapper