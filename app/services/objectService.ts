import { ObjectNotFoundError } from '../errors/object/ObjectNotFoundError';
import {
  ObjectModel,
  CreateObjectInput,
  UpdateObjectInput
} from '../models/object.model';

export const ObjectService = {
  async createObject(objectData: CreateObjectInput = {}) {
    return ObjectModel.create(objectData);
  },

  async getObjectById(id: number) {
    const object = await ObjectModel.findById(id);
    if (!object) {
      throw new ObjectNotFoundError(id, 'ObjectService.getObjectById');
    }
    return object;
  },

  async getAllObjects() {
    return ObjectModel.getAll();
  },

  async updateObject(id: number, objectData: UpdateObjectInput) {
    const existingObject = await ObjectModel.findById(id);
    if (!existingObject) {
      throw new ObjectNotFoundError(id, 'ObjectService.updateObject');
    }
    return ObjectModel.update(id, objectData);
  },

  async deleteObject(id: number) {
    const existingObject = await ObjectModel.findById(id);
    if (!existingObject) {
      throw new ObjectNotFoundError(id, 'ObjectService.deleteObject');
    }
    return ObjectModel.delete(id);
  }
};