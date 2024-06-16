import Like from '../../models/likes/Like'
import { UserAttributes } from '../../models/users/User';

class LikeService {
    async create(user: UserAttributes, articleId: string): Promise<Like> {
        try {
            const like = await Like.create({ articleId: Number(articleId), userId: user.id })
            return like
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes, articleId: string): Promise<number> {
        try {
            const deletedRowsCount = await Like.destroy({ where: { articleId: Number(articleId), userId: user.id } });
            if (deletedRowsCount === 0) {
                throw new Error('Like not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default LikeService