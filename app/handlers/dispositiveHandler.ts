import { FastifyRequest, FastifyReply } from 'fastify';
import { DispositiveService } from '../services/dispositiveService';
import { 
  CreateDispositiveInput, 
  UpdateDispositiveInput,
  AssignUserInput,
  BlockDispositiveInput
} from '../models/dispositive.model';

export const createDispositive = async (
  request: FastifyRequest<{ Body: CreateDispositiveInput }>,
  reply: FastifyReply
) => {
  const dispositiveData = request.body;

  if (typeof dispositiveData.start_date === 'string') {
    dispositiveData.start_date = new Date(dispositiveData.start_date);
  }
  if (typeof dispositiveData.end_date === 'string') {
    dispositiveData.end_date = new Date(dispositiveData.end_date);
  }

  const newDispositive = await DispositiveService.createDispositive(dispositiveData);
  return reply.code(201).send({ success: true, data: newDispositive });
};

export const getDispositives = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const dispositives = await DispositiveService.getAllDispositives();
  return reply.code(200).send({ success: true, data: dispositives });
};

export const getDispositiveById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const dispositive = await DispositiveService.getDispositiveById(Number(id));
  return reply.code(200).send({ success: true, data: dispositive });
};

export const getDispositivesByProduct = async (
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) => {
  const { productId } = request.params;
  const dispositives = await DispositiveService.getDispositivesByProduct(Number(productId));
  return reply.code(200).send({ success: true, data: dispositives });
};

export const updateDispositive = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDispositiveInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const dispositiveData = request.body;

  if (typeof dispositiveData.start_date === 'string') {
    dispositiveData.start_date = new Date(dispositiveData.start_date);
  }
  if (typeof dispositiveData.end_date === 'string') {
    dispositiveData.end_date = new Date(dispositiveData.end_date);
  }

  const updatedDispositive = await DispositiveService.updateDispositive(Number(id), dispositiveData);
  return reply.code(200).send({ success: true, data: updatedDispositive });
};

export const assignUser = async (
  request: FastifyRequest<{ Params: { id: string }, Body: AssignUserInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const userData = request.body;

  const updatedDispositive = await DispositiveService.assignUserToDispositive(Number(id), userData);
  return reply.code(200).send({ success: true, data: updatedDispositive });
};

export const blockDispositive = async (
  request: FastifyRequest<{ Params: { id: string }, Body: BlockDispositiveInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const blockData = request.body;

  const updatedDispositive = await DispositiveService.blockDispositive(Number(id), blockData);
  return reply.code(200).send({ 
    success: true, 
    data: updatedDispositive,
    message: blockData.blocked ? 'Dispositive has been blocked' : 'Dispositive has been unblocked'
  });
};

export const deleteDispositive = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await DispositiveService.deleteDispositive(Number(id));
  return reply.code(200).send({ success: true, message: 'Dispositive deleted successfully' });
};
