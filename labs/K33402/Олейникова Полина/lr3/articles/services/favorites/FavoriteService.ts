import Article from '../../models/articles/Article';
import Favorite from '../../models/favorites/Favorite'

class FavoriteService {
    async getAll(userId: number): Promise<Favorite[]> {
        try {
            const favorites = await Favorite.findAll({
                where: { userId },
                include: [Article] 
            })
            return favorites
        } catch (error) {
            throw error;
        }
    }

    async create(userId: number, articleId: string): Promise<Favorite> {
        try {
            const favorite = await Favorite.create({ articleId: Number(articleId), userId })
            return favorite
        } catch (error) {
            throw error;
        }
    }

    async delete(userId: number, articleId: string): Promise<number> {
        try {
            const deletedRowsCount = await Favorite.destroy({ where: { articleId: Number(articleId), userId } });
            if (deletedRowsCount === 0) {
                throw new Error('Favorite not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default FavoriteService