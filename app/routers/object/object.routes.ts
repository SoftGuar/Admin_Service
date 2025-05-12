import { FastifyInstance } from 'fastify';
import {
  createObject,
  getObjects,
  getObjectById,
  updateObject,
  deleteObject
} from '../../handlers/objectHandler';
import {
  createObjectSchema,
  getObjectsSchema,
  getObjectByIdSchema,
  updateObjectSchema,
  deleteObjectSchema
} from './object.schema';

const objectRoutes = async (fastify: FastifyInstance) => {
  // Create a new object
  fastify.post('/', { schema: createObjectSchema }, createObject);
  
  // Get all objects
  fastify.get('/', { schema: getObjectsSchema }, getObjects);
  
  // Get a specific object by ID
  fastify.get('/:id', { schema: getObjectByIdSchema }, getObjectById);
  
  // Update an object
  fastify.put('/:id', { schema: updateObjectSchema }, updateObject);
  
  // Delete an object
  fastify.delete('/:id', { schema: deleteObjectSchema }, deleteObject);
};

export default objectRoutes;