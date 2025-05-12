import { BaseError } from '../BaseError';

export class ObjectNotFoundError extends BaseError {
  constructor(objectId: number, context?: string) {
    super(
      `Object with ID ${objectId} was not found.`,
      'OBJECT_NOT_FOUND',
      404,
      { objectId },
      context || 'ObjectService',
      'Please ensure the object ID exists and is correct.'
    );
  }
}