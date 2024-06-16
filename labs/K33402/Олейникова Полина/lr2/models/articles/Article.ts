import { Table, Column, ForeignKey, Model, PrimaryKey, DataType, AutoIncrement, HasMany, BelongsTo } from 'sequelize-typescript'
import User from '../users/User'
import Comment from '../comments/Comment'
import Like from '../likes/Like'
import Specialization from '../specializations/Specialization'
import Favorite from '../favorites/Favorite';

export enum StatusType {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    NOT_CONSIDER = "NOT_CONSIDER",
};

export enum LevelType {
    SIMPLE = "SIMPLE",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
};

export type ArticleAttributes = ArticleAttributesOptionally & ArticleCreationAttributes

export type ArticleCreationAttributes = {
    title: string,
    content: string;
    tags: string;
    level: LevelType;
    status?: StatusType;
    userId: number;
    specializationId: number;
};

type ArticleAttributesOptionally = {
    id: number;
    specialization: Specialization;
    user: User;
    comments: Comment[];
    likes: Like[];
    favorites: Favorite[];
};

export type ArticleUpdateAttributes = Pick<ArticleCreationAttributes, 'content' | 'title' | 'tags' | 'level' | 'specializationId'>;

@Table
export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    title: string;

    @Column
    content: string

    @Column
    tags: string

    @Column({
        type: DataType.ENUM(...Object.values(LevelType)),
    })
    level: LevelType

    @Column({
        type: DataType.ENUM(...Object.values(StatusType)),
        defaultValue: StatusType.NOT_CONSIDER,
    })
    status!: StatusType;

    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Specialization)
    @Column
    specializationId: number

    @BelongsTo(() => Specialization)
    specialization: Specialization;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Like)
    likes: Like[];

    @HasMany(() => Favorite)
    favorites: Favorite[];
}

export default Article
