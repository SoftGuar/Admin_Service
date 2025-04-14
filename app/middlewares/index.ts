import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import errorHandler from './errorHandlerMiddleware';

const registerMiddlewares = (fastify: FastifyInstance) => {

  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  errorHandler(fastify);
};


export default registerMiddlewares;