import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from './Rating';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('decimal')
    price!: number;

    @Column('int')
    stock!: number;

    @Column('decimal', { default: 0 })
    discount!: number;

    @OneToMany(() => Rating, rating => rating.item)
    ratings!: Rating[];
}
