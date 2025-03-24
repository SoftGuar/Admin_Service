import exampleRoutes from './example.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import productRoutes from './Product/product.routes';
import dispositiveRoutes from './Dispositive/dispositive.routes';


const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(productRoutes, { prefix: 'products' });
  fastify.register(dispositiveRoutes, { prefix: 'dispositives' });
};

export default registerRoutes;


