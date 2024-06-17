import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from './Item';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Item)
    item!: Item;

    @Column('int')
    quantity!: number;

    @Column()
    date!: Date;
}