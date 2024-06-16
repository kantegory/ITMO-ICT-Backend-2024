import Article from '../../models/articles/Article';
import Favorite from '../../models/favorites/Favorite'
import { UserAttributes } from '../../models/users/User';

class FavoriteService {
    async getAll(user: UserAttributes): Promise<Favorite[]> {
        try {
            const favorites = await Favorite.findAll({
                where: { userId: user.id },
                include: [Article] 
            })
            return favorites
        } catch (error) {
            throw error;
        }
    }

    async create(user: UserAttributes, articleId: string): Promise<Favorite> {
        try {
            const favorite = await Favorite.create({ articleId: Number(articleId), userId: user.id })
            return favorite
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes, articleId: string): Promise<number> {
        try {
            const deletedRowsCount = await Favorite.destroy({ where: { articleId: Number(articleId), userId: user.id } });
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