import Like from '../../models/likes/Like'

class LikeService {
    async create(userId: number, articleId: string): Promise<Like> {
        try {
            const like = await Like.create({ articleId: Number(articleId), userId })
            return like
        } catch (error) {
            throw error;
        }
    }

    async delete(userId: number, articleId: string): Promise<number> {
        try {
            const deletedRowsCount = await Like.destroy({ where: { articleId: Number(articleId), userId } });
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