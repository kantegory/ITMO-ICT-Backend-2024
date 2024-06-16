"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentMapper {
    commentToDict(entity) {
        return {
            id: entity.id,
            entity_id: entity.entity_id,
            rating: entity.rating,
        };
    }
}
exports.default = CommentMapper;
