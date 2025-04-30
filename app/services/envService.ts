import { EnvironmentNotFoundError } from '../errors/env/EnvironmentNotFoundError';
import {
  EnvironmentModel,
  CreateEnvironmentInput,
  UpdateEnvironmentInput
} from '../models/env.model';

export const EnvironmentService = {
  async createEnvironment(environmentData: CreateEnvironmentInput) {
    return EnvironmentModel.create(environmentData);
  },

  async getEnvironmentById(id: number) {
    const environment = await EnvironmentModel.findById(id);
    if (!environment) {
      throw new EnvironmentNotFoundError(id, 'EnvironmentService.getEnvironmentById');
    }
    return environment;
  },

  async getAllEnvironments() {
    return EnvironmentModel.getAll();
  },

  async getEnvironmentsByUser(userId: number) {
    
    return EnvironmentModel.findByUser(userId);
  },

  async updateEnvironment(id: number, environmentData: UpdateEnvironmentInput) {
    // Check if environment exists
    const existingEnvironment = await EnvironmentModel.findById(id);
    if (!existingEnvironment) {
      throw new EnvironmentNotFoundError(id, 'EnvironmentService.updateEnvironment');
    }

    
    return EnvironmentModel.update(id, environmentData);
  },

  async deleteEnvironment(id: number) {
    // Check if environment exists
    const existingEnvironment = await EnvironmentModel.findById(id);
    if (!existingEnvironment) {
      throw new EnvironmentNotFoundError(id, 'EnvironmentService.deleteEnvironment');
    }

    return EnvironmentModel.delete(id);
  }
};