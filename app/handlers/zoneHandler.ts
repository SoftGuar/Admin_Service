import { FastifyRequest, FastifyReply } from 'fastify';
import { ZoneService } from '../services/zoneService';
import { CreateZoneInput, UpdateZoneInput } from '../models/zone.model';

export const createZone = async (
  request: FastifyRequest<{ Body: CreateZoneInput }>,
  reply: FastifyReply
) => {
  const zoneData = request.body;
  const newZone = await ZoneService.createZone(zoneData);
  return reply.code(201).send({ success: true, data: newZone });
};

export const getZones = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const zones = await ZoneService.getAllZones();
  return reply.code(200).send({ success: true, data: zones });
};

export const getZoneById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const zone = await ZoneService.getZoneById(Number(id));
  return reply.code(200).send({ success: true, data: zone });
};

export const updateZone = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateZoneInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const zoneData = request.body;
  const updatedZone = await ZoneService.updateZone(Number(id), zoneData);
  return reply.code(200).send({ success: true, data: updatedZone });
};

export const deleteZone = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await ZoneService.deleteZone(Number(id));
  return reply.code(200).send({ success: true, message: 'Zone deleted successfully' });
};