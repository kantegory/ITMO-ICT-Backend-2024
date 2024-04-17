import TravelUserLink from "../../../models/links/TravelUserLink";


class TravelUserLinkMapper {
    travelUserLinkToDict(entity: TravelUserLink) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            travel_id: entity.travel_id,
            seats: entity.seats,
            status: entity.status,
        };
    }
}

export default TravelUserLinkMapper