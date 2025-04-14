import { ProductModel, CreateProductInput, UpdateProductInput } from '../models/product.model';
import { InvalidProductPriceError } from '../errors/products/InvalidProductPrice';
import { ProductNotFoundError } from '../errors/products/ProductNotFoundError';

export const ProductService = {
  createProduct: async (productData: CreateProductInput) => {
    if (productData.price <= 0) {
      throw new InvalidProductPriceError(
        productData.price,
        'ProductService.createProduct'
      );
    }

    return ProductModel.create(productData);
  },

  getProductById: async (id: number) => {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ProductNotFoundError(id, 'ProductService.getProductById');
    }

    return product;
  },

  getAllProducts: async () => {
    return ProductModel.getAll();
  },

  updateProduct: async (id: number, productData: UpdateProductInput) => {
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      throw new ProductNotFoundError(id, 'ProductService.updateProduct');
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new InvalidProductPriceError(
        productData.price,
        'ProductService.updateProduct'
      );
    }

    return ProductModel.update(id, productData);
  },

  deleteProduct: async (id: number) => {
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      throw new ProductNotFoundError(id, 'ProductService.deleteProduct');
    }

    return ProductModel.delete(id);
  }
};
