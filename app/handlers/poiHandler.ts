import { FastifyRequest, FastifyReply } from 'fastify';
import { POICategoryService, POIService } from '../services/poiService';
import { CreatePOICategoryInput, CreatePOIInput, UpdatePOICategoryInput, UpdatePOIInput } from '../models/poi.model';

// POI Category handlers
export const createPOICategory = async (
  request: FastifyRequest<{ Body: CreatePOICategoryInput }>,
  reply: FastifyReply
) => {
  const categoryData = request.body;
  const newCategory = await POICategoryService.createPOICategory(categoryData);
  return reply.code(201).send({ success: true, data: newCategory });
};

export const getPOICategories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const categories = await POICategoryService.getAllPOICategories();
  return reply.code(200).send({ success: true, data: categories });
};

export const getPOICategoryById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const category = await POICategoryService.getPOICategoryById(Number(id));
  return reply.code(200).send({ success: true, data: category });
};

export const updatePOICategory = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdatePOICategoryInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const categoryData = request.body;
  const updatedCategory = await POICategoryService.updatePOICategory(Number(id), categoryData);
  return reply.code(200).send({ success: true, data: updatedCategory });
};

export const deletePOICategory = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await POICategoryService.deletePOICategory(Number(id));
  return reply.code(200).send({ success: true, message: 'POI Category deleted successfully' });
};

// POI handlers
export const createPOI = async (
  request: FastifyRequest<{ Body: CreatePOIInput }>,
  reply: FastifyReply
) => {
  const poiData = request.body;
  const newPOI = await POIService.createPOI(poiData);
  return reply.code(201).send({ success: true, data: newPOI });
};

export const getPOIs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const pois = await POIService.getAllPOIs();
  return reply.code(200).send({ success: true, data: pois });
};

export const getPOIById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const poi = await POIService.getPOIById(Number(id));
  return reply.code(200).send({ success: true, data: poi });
};

export const getPOIsByCategory = async (
  request: FastifyRequest<{ Params: { categoryId: string } }>,
  reply: FastifyReply
) => {
  const { categoryId } = request.params;
  const pois = await POIService.getPOIsByCategory(Number(categoryId));
  return reply.code(200).send({ success: true, data: pois });
};

export const getPOIsByZone = async (
  request: FastifyRequest<{ Params: { zoneId: string } }>,
  reply: FastifyReply
) => {
  const { zoneId } = request.params;
  const pois = await POIService.getPOIsByZone(Number(zoneId));
  return reply.code(200).send({ success: true, data: pois });
};

export const updatePOI = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdatePOIInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const poiData = request.body;
  const updatedPOI = await POIService.updatePOI(Number(id), poiData);
  return reply.code(200).send({ success: true, data: updatedPOI });
};

export const deletePOI = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await POIService.deletePOI(Number(id));
  return reply.code(200).send({ success: true, message: 'POI deleted successfully' });
};
