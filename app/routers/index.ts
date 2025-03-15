import exampleRoutes from './example.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import productRoutes from './Product/product.routes';


const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(productRoutes, { prefix: 'products' });
  
  

};

export default registerRoutes;


