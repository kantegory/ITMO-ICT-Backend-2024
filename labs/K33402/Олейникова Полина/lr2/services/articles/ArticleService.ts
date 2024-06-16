import { Op } from 'sequelize';
import Article, { ArticleCreationAttributes, ArticleUpdateAttributes, LevelType, StatusType } from '../../models/articles/Article'
import User, { RoleType, UserAttributes } from '../../models/users/User';
import Specialization from '../../models/specializations/Specialization';
import Favorite from '../../models/favorites/Favorite';
import Like from '../../models/likes/Like';
import Comment from '../../models/comments/Comment';

type FilterArticles = {
    level?: LevelType,
    specializationId?: string;
    title?: string,
    offset?: number,
    limit?: number
}

class ArticleService {
    async getById(id: number): Promise<Article> {
        try {
            const article = await Article.findByPk(id, { include: [Comment, Specialization, User.scope('withoutPassword'), Like, Favorite] })
            if (!article) {
                throw new Error('Not Found');
            }
            return article
        }
        catch (error) {
            throw error;
        }
    }

    async getAll(filters: FilterArticles): Promise<any> {
        try {
            let whereCondition: any = {};

            if (filters.title) {
                whereCondition.title = { [Op.like]: `%${filters.title}%` };
            }
            if (filters.level) {
                whereCondition.level = filters.level
            }
            if (filters.specializationId) {
                whereCondition.specializationId = filters.specializationId
            }

            const articles = await Article.findAll({
                where: whereCondition,
                limit: filters.limit || 15,
                offset: filters.offset || 0,
                include: [Specialization, User.scope('withoutPassword')]
            })
            return articles
        } catch (error) {
            throw error;
        }
    }

    async create(user: UserAttributes, articleData: Omit<ArticleCreationAttributes, 'userId'>): Promise<Article> {
        try {
            const article = await Article.create({ ...articleData, userId: user.id })
            return article
        } catch (error) {
            throw error;
        }
    }

    async update(user: UserAttributes, articleId: string, articleData: ArticleUpdateAttributes): Promise<Article> {
        try {
            let whereCondition = {}
            if (user.role === RoleType.USER) {
                whereCondition = {
                    userId: user.id, status: StatusType.NOT_CONSIDER
                }
            }
            if (user.role === RoleType.MODERATOR) {
                whereCondition = {
                    userId: user.id
                }
            }
            const [updatedRowsCount, updatedArticle] = await Article.update(
                { 
                    title: articleData.content, 
                    content: articleData.content, 
                    tags: articleData.tags, 
                    level: articleData.level, 
                    specializationId: articleData.specializationId, 
                },
                {
                    where: { id: articleId, ...whereCondition },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('Article not found');
            }
            return updatedArticle[0];
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(user: UserAttributes, articleId: string, articleData: { status: StatusType }): Promise<Article> {
        try {
            if (user.role === 'USER') {
                throw new Error('Not enough rights');
            }
            const [updatedRowsCount, updatedArticle] = await Article.update(
                { status: articleData.status },
                {
                    where: { id: articleId, status: StatusType.NOT_CONSIDER },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('Article not found');
            }
            return updatedArticle[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes, articleId: string,): Promise<number> {
        try {
            let whereCondition = {}
            if (user.role !== RoleType.ADMIN) {
                whereCondition = {
                    userId: user.id
                }
            }
            const deletedRowsCount = await Article.destroy({ where: { id: articleId, ...whereCondition } });
            if (deletedRowsCount === 0) {
                throw new Error('Article not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default ArticleService