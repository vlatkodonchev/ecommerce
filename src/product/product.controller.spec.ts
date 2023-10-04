import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductDto, ProductStatus } from './dto/product.dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService]
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should create a product', () => {
      const productDto: ProductDto = {
        name: 'Test product',
        price: 1000,
        status: ProductStatus.ACTIVE
      };

      const createdProduct: Product = {
        id: 1,
        name: 'Test Product',
        price: 1000,
        status: ProductStatus.ACTIVE,
        images: []
      }

      jest.spyOn(productService, 'create').mockResolvedValue(createdProduct);
      expect(productController.createProduct(productDto)).toBe(createdProduct);

    });
  });

  describe('updateProduct', () => {
    it('should update a product', () => {
      const productId = 1;
      const updateName = { name: 'Updated Name' };
      const updatedProduct = productController.updateProduct(productId, updateName);

      const productServiceUpdateSpy = jest
      .spyOn(productService, 'update')
      .mockResolvedValue(updatedProduct);

      const result = productController.updateProduct(productId, updateName);
      expect(result).toEqual(updatedProduct);
      expect(productServiceUpdateSpy).toHaveBeenCalledWith(productId, updateName);

    });
  });

  describe('delete Product by ID', () => {
    it('should delete a product by give ID', () => {
      const productId = 1;

      const productServiceDeleteSpy = jest
      .spyOn(productService, 'remove')
      .mockResolvedValue(undefined);

      productController.deleteProductById(productId);
      expect(productServiceDeleteSpy).toBeCalledWith(productId);


    });

    it('we handle errors when deleting a product by ID', async () => {
      const productId = 1;
      const error = new Error('Failed to delete product');

      const productServiceRemoveSpy = jest
        .spyOn(productService, 'remove')
        .mockRejectedValue(error);

      try {
        await productController.deleteProductById(productId);
      } catch (e) {
        expect(e).toBe(error);
      }
      expect(productServiceRemoveSpy).toHaveBeenCalledWith(productId);
    });
  
  });
});
