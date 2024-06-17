import HotelComment from "../../models/comment/HotelComment";
import UserComment from "../../models/comment/UserComment";
import PlaceComment from "../../models/comment/PlaceComment";

class CommentMapper {
    commentToDict(entity: HotelComment | UserComment | PlaceComment) {
        return {
            id: entity.id,
            entity_id: entity.entity_id,
            title: entity.title,
            main_info: entity.main_info,
            rating: entity.rating,
        };
    }
}

export default CommentMapper