import exampleRoutes from './example.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import productRoutes from './Product/product.routes';
import dispositiveRoutes from './Dispositive/dispositive.routes';
import environmentRoutes from './env/env.routes';
import zoneRoutes from './zone/zone.routes';
import { poiCategoryRoutes, poiRoutes } from './poi/poi.routes';

const registerRoutes = (fastify: FastifyInstance) => {

  fastify.register(productRoutes, { prefix: 'products' });
  fastify.register(dispositiveRoutes, { prefix: 'dispositives' });
  fastify.register(environmentRoutes,{prefix:'environments'})
  fastify.register(zoneRoutes,{prefix:'zones'})
  fastify.register(poiCategoryRoutes, { prefix: 'poiCategories' });
  fastify.register(poiRoutes, { prefix: 'pois' });

};

export default registerRoutes;


