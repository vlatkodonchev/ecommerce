import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
    ) {}

    async create(createProductDto: ProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({where: {id}});

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async update(id: number, updateProductDto: ProductDto): Promise<Product> {
        const product = await this.findById(id);
        this.productRepository.merge(product, updateProductDto);
        return await this.productRepository.save(product);        
    }

    async remove(id: number): Promise<void> {
        const product = await this.findById(id);
        await this.productRepository.remove(product);
    }
}
