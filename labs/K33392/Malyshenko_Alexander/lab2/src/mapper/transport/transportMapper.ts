import { Transport } from "../../models/transport/Transport"

class TransportMapper {
    transportToDict(entity: Transport) {
        return {
            id: entity.id,
            user_id: entity.user_id,
            name: entity.name,
            type: entity.type,
            seats: entity.seats,
        };
    }
}

export default TransportMapper