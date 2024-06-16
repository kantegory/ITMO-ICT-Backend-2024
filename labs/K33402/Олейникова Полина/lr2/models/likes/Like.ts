import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import User from '../users/User'
import Article from '../articles/Article'

export type LikeAttributes = {
    id: number;
    userId: number;
    articleId: number;
    article: string;
    user: User;
};

export type LikeCreationAttributes = Optional<LikeAttributes, 'id' | 'article' | 'user'>;

@Table
export class Like extends Model<LikeAttributes, LikeCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Article)
    @Column
    articleId: number

    @BelongsTo(() => Article)
    article: Article;

    @BelongsTo(() => User)
    user: User;
}

export default Like
