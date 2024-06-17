import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from './Item';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Item, item => item.ratings)
    item!: Item;

    @Column('int')
    rating!: number;

    @Column()
    comment!: string;
}
