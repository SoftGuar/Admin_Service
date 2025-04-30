import { DispositiveNotFoundError } from '../errors/dispositives/DispositiveNotFoundError';
import { ProductNotFoundError } from '../errors/products/ProductNotFoundError';

import { 
  DispositiveModel, 
  CreateDispositiveInput, 
  UpdateDispositiveInput,
  AssignUserInput,
  BlockDispositiveInput
} from '../models/dispositive.model';

import { ProductModel } from '../models/product.model';

export const DispositiveService = {
  
  async createDispositive(dispositiveData: CreateDispositiveInput) {
    const product = await ProductModel.findById(dispositiveData.product_id);
    if (!product) {
      throw new ProductNotFoundError(dispositiveData.product_id, 'DispositiveService.createDispositive');
    }
    return DispositiveModel.create(dispositiveData);
  },

  async getDispositiveById(id: number) {
    const dispositive = await DispositiveModel.findById(id);
    if (!dispositive) {
      throw new DispositiveNotFoundError(id, 'DispositiveService.getDispositiveById');
    }
    return dispositive;
  },

  async getAllDispositives() {
    return DispositiveModel.getAll();
  },

  async getDispositivesByProduct(productId: number) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new ProductNotFoundError(productId, 'DispositiveService.getDispositivesByProduct');
    }
    return DispositiveModel.findByProduct(productId);
  },

  async updateDispositive(id: number, dispositiveData: UpdateDispositiveInput) {
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new DispositiveNotFoundError(id, 'DispositiveService.updateDispositive');
    }

    if (dispositiveData.product_id) {
      const product = await ProductModel.findById(dispositiveData.product_id);
      if (!product) {
        throw new ProductNotFoundError(dispositiveData.product_id, 'DispositiveService.updateDispositive');
      }
    }

    return DispositiveModel.update(id, dispositiveData);
  },

  async assignUserToDispositive(id: number, data: AssignUserInput) {
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
    }      throw new DispositiveNotFoundError(id, 'DispositiveService.assignUserToDispositive');

    return DispositiveModel.assignUser(id, data);
  },

  async blockDispositive(id: number, data: BlockDispositiveInput) {
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new DispositiveNotFoundError(id, 'DispositiveService.blockDispositive');
    }

    return DispositiveModel.blockDispositive(id, data);
  },

  async deleteDispositive(id: number) {
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new DispositiveNotFoundError(id, 'DispositiveService.deleteDispositive');
    }

    return DispositiveModel.delete(id);
  }
};