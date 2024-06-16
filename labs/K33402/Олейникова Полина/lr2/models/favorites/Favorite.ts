import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import User from '../users/User'
import Article from '../articles/Article'

export type FavoriteAttributes = {
    id: number;
    userId: number;
    articleId: number;
    article: Article;
    user: User;
};

export type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'id' | 'article' | 'user'>;

@Table
export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
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

export default Favorite
