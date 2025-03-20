import { ProductService } from '../app/services/productService';
import { ProductModel } from '../app/models/product.model';

// Mock the entire module
jest.mock('../app/models/product.model');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    test('should create a product with valid data', async () => {
      const mockProductData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99
      };
      const mockCreatedProduct = { 
        id: 1, 
        ...mockProductData 
      };

      (ProductModel.create as jest.Mock).mockResolvedValue(mockCreatedProduct);

      const result = await ProductService.createProduct(mockProductData);

      expect(ProductModel.create).toHaveBeenCalledWith(mockProductData);
      expect(result).toEqual(mockCreatedProduct);
    });

    test('should throw error if price is not positive', async () => {
      const mockInvalidProduct = {
        name: 'Invalid Product',
        description: 'Test Description',
        price: 0
      };

      await expect(ProductService.createProduct(mockInvalidProduct))
        .rejects.toThrow('Product price must be positive');
      
      expect(ProductModel.create).not.toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    test('should return a product when it exists', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById(1);

      expect(ProductModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    test('should throw error if product is not found', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(ProductService.getProductById(999))
        .rejects.toThrow('Product not found');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('getAllProducts', () => {
    test('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 20.99 }
      ];

      (ProductModel.getAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await ProductService.getAllProducts();

      expect(ProductModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('updateProduct', () => {
    test('should update a product with valid data', async () => {
      const mockExistingProduct = {
        id: 1,
        name: 'Old Name',
        description: 'Old Description',
        price: 10.99
      };
      
      const mockUpdateData = {
        name: 'New Name',
        price: 15.99
      };
      
      const mockUpdatedProduct = {
        ...mockExistingProduct,
        ...mockUpdateData
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockExistingProduct);
      (ProductModel.update as jest.Mock).mockResolvedValue(mockUpdatedProduct);

      const result = await ProductService.updateProduct(1, mockUpdateData);

      expect(ProductModel.findById).toHaveBeenCalledWith(1);
      expect(ProductModel.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(result).toEqual(mockUpdatedProduct);
    });

    test('should throw error if product is not found', async () => {
      const mockUpdateData = { name: 'New Name' };

      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(ProductService.updateProduct(999, mockUpdateData))
        .rejects.toThrow('Product not found');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
      expect(ProductModel.update).not.toHaveBeenCalled();
    });

    test('should throw error if updated price is not positive', async () => {
      const mockExistingProduct = {
        id: 1,
        name: 'Old Name',
        price: 10.99
      };
      
      const mockInvalidUpdateData = {
        price: 0
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockExistingProduct);

      await expect(ProductService.updateProduct(1, mockInvalidUpdateData))
        .rejects.toThrow('Product price must be positive');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(1);
      expect(ProductModel.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    test('should delete a product when it exists', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 99.99
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (ProductModel.delete as jest.Mock).mockResolvedValue({ success: true });

      const result = await ProductService.deleteProduct(1);

      expect(ProductModel.findById).toHaveBeenCalledWith(1);
      expect(ProductModel.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });

    test('should throw error if product is not found', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(ProductService.deleteProduct(999))
        .rejects.toThrow('Product not found');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
      expect(ProductModel.delete).not.toHaveBeenCalled();
    });
  });
});