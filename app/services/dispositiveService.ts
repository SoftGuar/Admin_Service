import { 
  DispositiveModel, 
  CreateDispositiveInput, 
  UpdateDispositiveInput,
  AssignUserInput,
  BlockDispositiveInput
} from '../models/dispositive.model';
import { ProductModel } from '../models/product.model';

export const DispositiveService = {
  createDispositive: async (dispositiveData: CreateDispositiveInput) => {
    // Verify that the product exists
    const product = await ProductModel.findById(dispositiveData.product_id);
    if (!product) {
      throw new Error('Product not found');
    }

    return DispositiveModel.create(dispositiveData);
  },

  getDispositiveById: async (id: number) => {
    const dispositive = await DispositiveModel.findById(id);
    if (!dispositive) {
      throw new Error('Dispositive not found');
    }
    return dispositive;
  },

  getAllDispositives: async () => {
    return DispositiveModel.getAll();
  },

  getDispositivesByProduct: async (productId: number) => {
    // Verify that the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return DispositiveModel.findByProduct(productId);
  },

  updateDispositive: async (id: number, dispositiveData: UpdateDispositiveInput) => {
    // Verify dispositive exists
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new Error('Dispositive not found');
    }

    // If product_id is being updated, verify the new product exists
    if (dispositiveData.product_id) {
      const product = await ProductModel.findById(dispositiveData.product_id);
      if (!product) {
        throw new Error('Product not found');
      }
    }

    return DispositiveModel.update(id, dispositiveData);
  },

  assignUserToDispositive: async (id: number, data: AssignUserInput) => {
    // Verify dispositive exists
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new Error('Dispositive not found');
    }

    //verify that the user exists
    //must communicate the account managmentservice 
    if (data.user_id !== null) {
    }

    return DispositiveModel.assignUser(id, data);
  },

  blockDispositive: async (id: number, data: BlockDispositiveInput) => {
    // Verify dispositive exists
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new Error('Dispositive not found');
    }

    return DispositiveModel.blockDispositive(id, data);
  },

  deleteDispositive: async (id: number) => {
    // Verify dispositive exists
    const existingDispositive = await DispositiveModel.findById(id);
    if (!existingDispositive) {
      throw new Error('Dispositive not found');
    }

    return DispositiveModel.delete(id);
  }
};