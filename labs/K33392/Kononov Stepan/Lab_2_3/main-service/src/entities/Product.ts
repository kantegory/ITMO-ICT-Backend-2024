import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Warehouse} from './Warehouse';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('decimal')
    price!: number;

    @Column('int')
    quantity!: number;

    @Column('decimal', {default: 0})
    discount!: number;

    @ManyToOne(() => Warehouse, warehouse => warehouse.products)
    warehouse!: Warehouse;
}