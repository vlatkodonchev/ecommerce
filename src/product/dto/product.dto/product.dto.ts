import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum ProductStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(ProductStatus)
    status: ProductStatus;
}
