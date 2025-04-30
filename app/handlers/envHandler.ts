import { FastifyRequest, FastifyReply } from 'fastify';
import { EnvironmentService } from '../services/envService';
import {
  CreateEnvironmentInput,
  UpdateEnvironmentInput
} from '../models/env.model';

export const createEnvironment = async (
  request: FastifyRequest<{ Body: CreateEnvironmentInput }>,
  reply: FastifyReply
) => {
  const environmentData = request.body;
  const newEnvironment = await EnvironmentService.createEnvironment(environmentData);
  return reply.code(201).send({ success: true, data: newEnvironment });
};

export const getEnvironments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const environments = await EnvironmentService.getAllEnvironments();
  return reply.code(200).send({ success: true, data: environments });
};

export const getEnvironmentById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const environment = await EnvironmentService.getEnvironmentById(Number(id));
  return reply.code(200).send({ success: true, data: environment });
};

export const getEnvironmentsByUser = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const environments = await EnvironmentService.getEnvironmentsByUser(Number(userId));
  return reply.code(200).send({ success: true, data: environments });
};

export const updateEnvironment = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateEnvironmentInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const environmentData = request.body;
  const updatedEnvironment = await EnvironmentService.updateEnvironment(Number(id), environmentData);
  return reply.code(200).send({ success: true, data: updatedEnvironment });
};

export const deleteEnvironment = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await EnvironmentService.deleteEnvironment(Number(id));
  return reply.code(200).send({ success: true, message: 'Environment deleted successfully' });
};