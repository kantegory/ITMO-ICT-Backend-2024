import hashPassword from '../../utils/hashPassword'
import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, DataType, HasMany, AutoIncrement, PrimaryKey, Scopes } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Article from '../articles/Article';
import Comment from '../comments/Comment';
import Favorite from '../favorites/Favorite';
import Like from '../likes/Like';

export type UserAttributes = {
    id: number;
    name: string,
    email: string;
    role: RoleType;
    articles: Article[];
    comments: Comment[];
    favorites: Favorite[];
    likes: Like[];
    password: string;
};

export enum RoleType {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER",
};

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'articles' | 'comments' | 'favorites' | 'likes'>;


@Scopes({ 'withoutPassword': {
    attributes: { exclude: ['password'] },
}})
@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Unique
    @Column
    email: string

    @Column({
        type: DataType.ENUM(...Object.values(RoleType)),
        defaultValue: RoleType.USER,
    })
    role: RoleType;

    @AllowNull(false)
    @Column
    password: string

    @HasMany(() => Article)
    articles: Article[];

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Favorite)
    favorites: Favorite[];

    @HasMany(() => Like)
    likes: Like[];

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance
        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User

