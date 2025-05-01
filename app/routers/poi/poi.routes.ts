import { FastifyInstance } from 'fastify';
import { createPOICategorySchema, deletePOICategorySchema, getPOICategoriesSchema, getPOICategoryByIdSchema, updatePOICategorySchema,createPOISchema,updatePOISchema,getPOIByIdSchema,getPOIsSchema,deletePOISchema,getPOIsByCategorySchema,getPOIsByZoneSchema } from './poi.schema';
import { deletePOICategory, getPOICategories, getPOICategoryById, updatePOICategory,deletePOI, createPOICategory,createPOI,updatePOI,getPOIs,getPOIById,getPOIsByCategory,getPOIsByZone } from '../../handlers/poiHandler';

const poiRoutes = async (fastify: FastifyInstance) => {
  // POI routes
  fastify.post('/', { schema: createPOISchema }, createPOI);
  fastify.get('/', { schema: getPOIsSchema }, getPOIs);
  fastify.get('/:id', { schema: getPOIByIdSchema }, getPOIById);
  fastify.get('/category/:categoryId', { schema: getPOIsByCategorySchema }, getPOIsByCategory);
  fastify.get('/zone/:zoneId', { schema: getPOIsByZoneSchema }, getPOIsByZone);
  fastify.put('/:id', { schema: updatePOISchema }, updatePOI);
  fastify.delete('/:id', { schema: deletePOISchema }, deletePOI);
};

const poiCategoryRoutes = async (fastify: FastifyInstance) => {
  // POI Category routes
  fastify.post('/', { schema: createPOICategorySchema}, createPOICategory

  );
  fastify.get('/', { schema: getPOICategoriesSchema }, getPOICategories);
  fastify.get('/:id', { schema: getPOICategoryByIdSchema }, getPOICategoryById);
  fastify.put('/:id', { schema: updatePOICategorySchema }, updatePOICategory);
  fastify.delete('/:id', { schema: deletePOICategorySchema }, deletePOICategory);
};

// Export both route functions to be used in the main application
export { poiRoutes, poiCategoryRoutes };