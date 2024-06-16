import Comment, { CommentCreationAttributes } from '../../models/comments/Comment'
import User, { RoleType, UserAttributes } from '../../models/users/User';

class CommentService {
    async getAll(articleId: string): Promise<Comment[]> {
        try {
            const comments = await Comment.findAll({
                where: {
                    articleId
                },
                include: [User.scope('withoutPassword')]
            })
            return comments
        } catch (error) {
            throw error;
        }
    }

    async create(user: UserAttributes, commentData: Omit<CommentCreationAttributes, 'userId'>): Promise<Comment> {
        try {
            const comment = await Comment.create({ ...commentData, userId: user.id })
            return comment
        } catch (error) {
            throw error;
        }
    }

    async update(user: UserAttributes, commentId: string, commentData: { content: string }): Promise<Comment> {
        try {
            let whereCondition = {}
            if (user.role !== RoleType.ADMIN) {
                whereCondition = {
                    userId: user.id
                }
            }
            const [updatedRowsCount, updatedComment] = await Comment.update(
                { content: commentData.content },
                {
                    where: { id: commentId, ...whereCondition },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('Comment not found');
            }
            return updatedComment[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes, commentId: string): Promise<number> {
        try {
            let whereCondition = {}
            if (user.role !== RoleType.ADMIN) {
                whereCondition = {
                    userId: user.id
                }
            }
            const deletedRowsCount = await Comment.destroy({ where: { id: commentId, ...whereCondition } });
            if (deletedRowsCount === 0) {
                throw new Error('Comment not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default CommentService