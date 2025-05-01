import { FastifyInstance } from 'fastify';
import { 
  createZone, 
  getZones, 
  getZoneById, 
  updateZone, 
  deleteZone 
} from '../../handlers/zoneHandler';
import { 
  createZoneSchema, 
  getZonesSchema, 
  getZoneByIdSchema, 
  updateZoneSchema, 
  deleteZoneSchema 
} from './zone.schema';

const zoneRoutes = async (fastify: FastifyInstance) => {
  // Create a new zone
  fastify.post('/', { schema: createZoneSchema }, createZone);
  
  // Get all zones
  fastify.get('/', { schema: getZonesSchema }, getZones);
  
  // Get a specific zone by ID
  fastify.get('/:id', { schema: getZoneByIdSchema }, getZoneById);
  
  // Update a zone
  fastify.put('/:id', { schema: updateZoneSchema }, updateZone);
  
  // Delete a zone
  fastify.delete('/:id', { schema: deleteZoneSchema }, deleteZone);
};

export default zoneRoutes;