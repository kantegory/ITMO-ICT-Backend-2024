import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './Product';

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    location!: string;

    @OneToMany(() => Product, product => product.warehouse)
    products!: Product[];
}
