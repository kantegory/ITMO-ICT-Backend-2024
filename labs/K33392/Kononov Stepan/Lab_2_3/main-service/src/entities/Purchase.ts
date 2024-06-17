import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Product} from './Product';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Product)
    product!: Product;

    @Column('int')
    quantity!: number;

    @Column()
    date!: Date;
}
