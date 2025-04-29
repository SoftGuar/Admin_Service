import exampleRoutes from './example.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import productRoutes from './Product/product.routes';
import dispositiveRoutes from './Dispositive/dispositive.routes';


const registerRoutes = (fastify: FastifyInstance) => {

  fastify.register(productRoutes, { prefix: 'products' });
  fastify.register(dispositiveRoutes, { prefix: 'dispositives' });
};

export default registerRoutes;


