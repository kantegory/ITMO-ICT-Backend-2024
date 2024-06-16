import { Table, Column, ForeignKey, Model, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Article from '../articles/Article'

export type LikeAttributes = {
    id: number;
    userId: number;
    articleId: number;
    article: string;
};

export type LikeCreationAttributes = Optional<LikeAttributes, 'id' | 'article'>;

@Table
export class Like extends Model<LikeAttributes, LikeCreationAttributes> {
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

export default Like
