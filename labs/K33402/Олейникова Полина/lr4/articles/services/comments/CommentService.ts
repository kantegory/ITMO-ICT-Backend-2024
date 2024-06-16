import Comment, { CommentCreationAttributes } from '../../models/comments/Comment'

class CommentService {
    async getAll(articleId: string): Promise<Comment[]> {
        try {
            const comments = await Comment.findAll({
                where: {
                    articleId
                }
            })
            return comments
        } catch (error) {
            throw error;
        }
    }

    async create(userId: number, commentData: Omit<CommentCreationAttributes, 'userId'>): Promise<Comment> {
        try {
            const comment = await Comment.create({ ...commentData, userId })
            return comment
        } catch (error) {
            throw error;
        }
    }

    async update(userId: number, userRole: string, commentId: string, commentData: { content: string }): Promise<Comment> {
        try {
            let whereCondition = {}
            if (userRole !== 'ADMIN') {
                whereCondition = {
                    userId
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

    async delete(userId: number, userRole: string, commentId: string): Promise<number> {
        try {
            let whereCondition = {}
            if (userRole !== 'ADMIN') {
                whereCondition = {
                    userId
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