import { FastifyRequest, FastifyReply } from 'fastify';
import { ObjectService } from '../services/objectService';
import {
  CreateObjectInput,
  UpdateObjectInput
} from '../models/object.model';

export const createObject = async (
  request: FastifyRequest<{ Body: CreateObjectInput }>,
  reply: FastifyReply
) => {
  const objectData = request.body;
  const newObject = await ObjectService.createObject(objectData);
  return reply.code(201).send({ success: true, data: newObject });
};

export const getObjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const objects = await ObjectService.getAllObjects();
  return reply.code(200).send({ success: true, data: objects });
};

export const getObjectById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const object = await ObjectService.getObjectById(Number(id));
  return reply.code(200).send({ success: true, data: object });
};

export const updateObject = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateObjectInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const objectData = request.body;
  const updatedObject = await ObjectService.updateObject(Number(id), objectData);
  return reply.code(200).send({ success: true, data: updatedObject });
};

export const deleteObject = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await ObjectService.deleteObject(Number(id));
  return reply.code(200).send({ success: true, message: 'Object deleted successfully' });
};