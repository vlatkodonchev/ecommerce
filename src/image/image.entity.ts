import { from } from "rxjs";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from "src/product/product.entity";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ default: 1000 })
    priority: number;

    @ManyToOne(() => Product, (product) => product.images, {onDelete: 'CASCADE'})
    product: Product;
}