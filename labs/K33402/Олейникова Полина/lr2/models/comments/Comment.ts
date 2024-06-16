import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import User from '../users/User'
import Article from '../articles/Article'

export type CommentAttributes = {
    id: number;
    content: string;
    userId: number;
    articleId: number;
    user: User;
    article: Article;
};

export type CommentCreationAttributes = Optional<CommentAttributes, 'id' | 'user' | 'article'>;

@Table
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @Column
    content: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Article)
    @Column
    articleId: number

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Article)
    article: Article;
}

export default Comment
