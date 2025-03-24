import { ProductModel, CreateProductInput, UpdateProductInput } from '../models/product.model';

export const ProductService = {
  createProduct: async (productData: CreateProductInput) => {
    // Validate price is positive
    if (productData.price <= 0) {
      throw new Error('Product price must be positive');
    }

    return ProductModel.create(productData);
  },

  getProductById: async (id: number) => {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  getAllProducts: async () => {
    return ProductModel.getAll();
  },

  updateProduct: async (id: number, productData: UpdateProductInput) => {
    // Verify product exists
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Validate price if provided
    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error('Product price must be positive');
    }

    return ProductModel.update(id, productData);
  },

  deleteProduct: async (id: number) => {
    // Verify product exists
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Note: With Prisma's onDelete: Cascade, this will also delete related dispositives
    return ProductModel.delete(id);
  }
};