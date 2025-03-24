import prisma from '../services/prismaService';

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string | null;
  price?: number;
}

export const ProductModel = {
  create: async (productData: CreateProductInput) => {
    try {
      return await prisma.product.create({
        data: productData
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          Dispositive: true
        }
      });
    } catch (error) {
      console.error('Error finding product by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  },

  update: async (id: number, productData: UpdateProductInput) => {
    try {
      return await prisma.product.update({
        where: { id },
        data: productData
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.product.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};