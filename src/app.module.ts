import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ImageService } from './image/image.service';
import { ProductController } from './product/product.controller';
import { ImageController } from './image/image.controller';
import { Product } from './product/product.entity';
import { Image } from './image/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Makedonija1!',
  database: 'ecommerce',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,}),
  TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Image])],
  controllers: [AppController, ProductController, ImageController],
  providers: [AppService, ProductService, ImageService],
})
export class AppModule {
}
