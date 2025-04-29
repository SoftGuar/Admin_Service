import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/productService';
import { CreateProductInput, UpdateProductInput } from '../models/product.model';

export const createProduct = async (
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) => {
  const productData = request.body;
  const newProduct = await ProductService.createProduct(productData);
  return reply.code(201).send({ success: true, data: newProduct });
};

export const getProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await ProductService.getAllProducts();
  return reply.code(200).send({ success: true, data: products });
};

export const getProductById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const product = await ProductService.getProductById(Number(id));
  return reply.code(200).send({ success: true, data: product });
};

export const updateProduct = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateProductInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const productData = request.body;
  const updatedProduct = await ProductService.updateProduct(Number(id), productData);
  return reply.code(200).send({ success: true, data: updatedProduct });
};

export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await ProductService.deleteProduct(Number(id));
  return reply.code(200).send({ success: true, message: 'Product deleted successfully' });
};
