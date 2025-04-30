import prisma from '../services/prismaService';

export interface CreateEnvironmentInput {
  userId: number;
}

export interface UpdateEnvironmentInput {
  userId?: number;
}

export const EnvironmentModel = {
  create: async (environmentData: CreateEnvironmentInput) => {
    try {
      return await prisma.environment.create({
        data: environmentData
      });
    } catch (error) {
      console.error('Error creating environment:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.environment.findUnique({
        where: { id },
        include: {
          zones: true,
          elements: true
        }
      });
    } catch (error) {
      console.error('Error finding environment by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.environment.findMany({
        include: {
          zones: true,
          elements: true
        }
    });
    } catch (error) {
      console.error('Error getting all environments:', error);
      throw error;
    }
  },

  findByUser: async (userId: number) => {
    try {
      return await prisma.environment.findMany({
        where: { userId }
      });
    } catch (error) {
      console.error('Error finding environments by user ID:', error);
      throw error;
    }
  },

  update: async (id: number, environmentData: UpdateEnvironmentInput) => {
    try {
      return await prisma.environment.update({
        where: { id },
        data: environmentData
      });
    } catch (error) {
      console.error('Error updating environment:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.environment.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting environment:', error);
      throw error;
    }
  }
};