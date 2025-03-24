import { FastifyInstance } from 'fastify';
import { 
  createDispositive, 
  getDispositives, 
  getDispositiveById,
  getDispositivesByProduct,
  updateDispositive,
  assignUser,
  blockDispositive,
  deleteDispositive
} from '../../handlers/dispositiveHandler';
import { 
  createDispositiveSchema, 
  getDispositivesSchema, 
  getDispositiveByIdSchema,
  getDispositivesByProductSchema,
  updateDispositiveSchema,
  assignUserSchema,
  blockDispositiveSchema,
  deleteDispositiveSchema
} from './dispositive.schema';

const dispositiveRoutes = async (fastify: FastifyInstance) => {
  // Create a new dispositive
  fastify.post('/', { schema: createDispositiveSchema }, createDispositive);
  
  // Get all dispositives
  fastify.get('/', { schema: getDispositivesSchema }, getDispositives);
  
  // Get a specific dispositive by ID
  fastify.get('/:id', { schema: getDispositiveByIdSchema }, getDispositiveById);
  
  // Get dispositives by product ID
  fastify.get('/product/:productId', { schema: getDispositivesByProductSchema }, getDispositivesByProduct);
  
  // Update a dispositive
  fastify.put('/:id', { schema: updateDispositiveSchema }, updateDispositive);
  
  // Assign/unassign a user to a dispositive
  fastify.patch('/:id/assign-user', { schema: assignUserSchema }, assignUser);
  
  // Block/unblock a dispositive
  fastify.patch('/:id/block', { schema: blockDispositiveSchema }, blockDispositive);
  
  // Delete a dispositive
  fastify.delete('/:id', { schema: deleteDispositiveSchema }, deleteDispositive);
};

export default dispositiveRoutes;