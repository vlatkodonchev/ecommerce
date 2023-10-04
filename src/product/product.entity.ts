import { Image } from "src/image/image.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ default: 'active' })
    status: string; // active or inactive

    @OneToMany(() => Image, (image) => image.product)
    images: Image[];
}