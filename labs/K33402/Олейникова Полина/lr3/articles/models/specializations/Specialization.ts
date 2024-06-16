import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, HasMany } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Article from '../articles/Article';

export type SpecializationAttributes = {
    id: string,
    name: string,
    articles: Article[]
};

export type SpecializationCreationAttributes = Optional<SpecializationAttributes, 'id' | 'articles'>;

@Table
export class Specialization extends Model<SpecializationAttributes, SpecializationCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @HasMany(() => Article)
    articles: Article[];
}

export default Specialization
