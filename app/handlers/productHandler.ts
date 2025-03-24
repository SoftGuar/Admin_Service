import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/productService';
import { CreateProductInput, UpdateProductInput } from '../models/product.model';

export const createProduct = async (
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) => {
  try {
    const productData = request.body;
    const newProduct = await ProductService.createProduct(productData);
    return reply.code(201).send({ success: true, data: newProduct });
  } catch (error) {
    return reply.code(400).send({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
};

export const getProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const products = await ProductService.getAllProducts();
    return reply.code(200).send({ success: true, data: products });
  } catch (error) {
    return reply.code(500).send({ 
      success: false, 
      message: 'An unexpected error occurred' 
    });
  }
};

export const getProductById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const product = await ProductService.getProductById(Number(id));
    return reply.code(200).send({ success: true, data: product });
  } catch (error) {
    return reply.code(404).send({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
};

export const updateProduct = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateProductInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const productData = request.body;
    const updatedProduct = await ProductService.updateProduct(Number(id), productData);
    return reply.code(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return reply.code(404).send({ 
        success: false, 
        message: error.message 
      });
    }
    return reply.code(400).send({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
};

export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await ProductService.deleteProduct(Number(id));
    return reply.code(200).send({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return reply.code(404).send({ 
        success: false, 
        message: error.message 
      });
    }
    return reply.code(500).send({ 
      success: false, 
      message: 'An unexpected error occurred' 
    });
  }
};