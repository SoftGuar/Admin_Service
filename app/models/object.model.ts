import prisma from '../services/prismaService';

export interface CreateObjectInput {
  // Empty as per your provided model
}

export interface UpdateObjectInput {
  // Empty as per your provided model
}

export const ObjectModel = {
  create: async (objectData: CreateObjectInput = {}) => {
    try {
      return await prisma.object.create({
        data: objectData
      });
    } catch (error) {
      console.error('Error creating object:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.object.findUnique({
        where: { id },
        include: {
          environmentElements: true
        }
      });
    } catch (error) {
      console.error('Error finding object by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.object.findMany({
        include: {
          environmentElements: true
        }
      });
    } catch (error) {
      console.error('Error getting all objects:', error);
      throw error;
    }
  },

  update: async (id: number, objectData: UpdateObjectInput) => {
    try {
      return await prisma.object.update({
        where: { id },
        data: objectData,
        include: {
          environmentElements: true
        }
      });
    } catch (error) {
      console.error('Error updating object:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.object.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting object:', error);
      throw error;
    }
  }
};