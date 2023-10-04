import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto/product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    async createProduct(@Body() createProductDto: ProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Get('all')
    async findAllProducts(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findProductById(@Param('id') id: number): Promise<Product> {
        return this.productService.findById(id);
    }

    @Delete('delete/:id')
    async deleteProductById(@Param('id') id: number): Promise<void> {
        return this.productService.remove(id);
    }

    @Put('update/:id')
    async updateProduct(@Param('id') id: number, @Body() updateData: any) {
        return this.productService.update(id, updateData);
    }

}
