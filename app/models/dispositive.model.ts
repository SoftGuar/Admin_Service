import prisma from '../services/prismaService';

export interface CreateDispositiveInput {
  type: string;
  start_date: Date;
  end_date: Date;
  initial_state: string;
  MAC: string;
  state: string;
  product_id: number;
}

export interface UpdateDispositiveInput {
  type?: string;
  start_date?: Date;
  end_date?: Date;
  initial_state?: string;
  MAC?: string;
  state?: string;
  product_id?: number;
}

export interface AssignUserInput {
  user_id: number ;
}

export interface BlockDispositiveInput {
  blocked: boolean;
}

export const DispositiveModel = {
  create: async (dispositiveData: CreateDispositiveInput) => {
    try {
      return await prisma.dispositive.create({
        data: dispositiveData,
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error creating dispositive:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.dispositive.findUnique({
        where: { id },
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error finding dispositive by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.dispositive.findMany({
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error getting all dispositives:', error);
      throw error;
    }
  },

  findByProduct: async (productId: number) => {
    try {
      return await prisma.dispositive.findMany({
        where: { product_id: productId },
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error finding dispositives by product ID:', error);
      throw error;
    }
  },

  update: async (id: number, dispositiveData: UpdateDispositiveInput) => {
    try {
      return await prisma.dispositive.update({
        where: { id },
        data: dispositiveData,
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error updating dispositive:', error);
      throw error;
    }
  },

  assignUser: async (id: number, data: AssignUserInput) => {
    try {
      return await prisma.dispositive.update({
        where: { id },
        data: { user_id: data.user_id },
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error assigning user to dispositive:', error);
      throw error;
    }
  },

  blockDispositive: async (id: number, data: BlockDispositiveInput) => {
    try {
      const state = data.blocked ? 'BLOCKED' : 'ACTIVE';
      const updateData: any = { state };
            
      return await prisma.dispositive.update({
        where: { id },
        data: updateData,
        include: {
          Product: true
        }
      });
    } catch (error) {
      console.error('Error blocking/unblocking dispositive:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.dispositive.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting dispositive:', error);
      throw error;
    }
  }
};