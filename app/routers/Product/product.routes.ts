import { FastifyInstance } from 'fastify';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../../handlers/productHandler';
import { 
  createProductSchema, 
  getProductsSchema, 
  getProductByIdSchema, 
  updateProductSchema, 
  deleteProductSchema 
} from './product.schema';

const productRoutes = async (fastify: FastifyInstance) => {
  // Create a new product
  fastify.post('/', { schema: createProductSchema }, createProduct);
  
  // Get all products
  fastify.get('/', { schema: getProductsSchema }, getProducts);
  
  // Get a specific product by ID
  fastify.get('/:id', { schema: getProductByIdSchema }, getProductById);
  
  // Update a product
  fastify.put('/:id', { schema: updateProductSchema }, updateProduct);
  
  // Delete a product
  fastify.delete('/:id', { schema: deleteProductSchema }, deleteProduct);
};

export default productRoutes;