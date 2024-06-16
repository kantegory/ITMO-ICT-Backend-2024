import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Article from '../articles/Article'

export type FavoriteAttributes = {
    id: number;
    userId: number;
    articleId: number;
    article: Article;
};

export type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'id' | 'article'>;

@Table
export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    userId: number

    @ForeignKey(() => Article)
    @Column
    articleId: number

    @BelongsTo(() => Article)
    article: Article;
}

export default Favorite
