import { FastifyInstance } from 'fastify';
import {
  createEnvironment,
  getEnvironments,
  getEnvironmentById,
  getEnvironmentsByUser,
  updateEnvironment,
  deleteEnvironment
} from '../../handlers/envHandler';
import {
  createEnvironmentSchema,
  getEnvironmentsSchema,
  getEnvironmentByIdSchema,
  getEnvironmentsByUserSchema,
  updateEnvironmentSchema,
  deleteEnvironmentSchema
} from './env.schema';

const environmentRoutes = async (fastify: FastifyInstance) => {
  // Create a new environment
  fastify.post('/', { schema: createEnvironmentSchema }, createEnvironment);
  
  // Get all environments
  fastify.get('/', { schema: getEnvironmentsSchema }, getEnvironments);
  
  // Get a specific environment by ID
  fastify.get('/:id', { schema: getEnvironmentByIdSchema }, getEnvironmentById);
  
  // Get environments by user ID
  fastify.get('/user/:userId', { schema: getEnvironmentsByUserSchema }, getEnvironmentsByUser);
  
  // Update an environment
  fastify.put('/:id', { schema: updateEnvironmentSchema }, updateEnvironment);
  
  // Delete an environment
  fastify.delete('/:id', { schema: deleteEnvironmentSchema }, deleteEnvironment);
};

export default environmentRoutes;