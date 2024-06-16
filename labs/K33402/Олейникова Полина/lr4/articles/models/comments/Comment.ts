import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Article from '../articles/Article'

export type CommentAttributes = {
    id: number;
    content: string;
    userId: number;
    articleId: number;
    article: Article;
};

export type CommentCreationAttributes = Optional<CommentAttributes, 'id' | 'article'>;

@Table
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @Column
    content: string

    @Column
    userId: number

    @ForeignKey(() => Article)
    @Column
    articleId: number

    @BelongsTo(() => Article)
    article: Article;
}

export default Comment
