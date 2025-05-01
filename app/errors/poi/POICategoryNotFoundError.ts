import { BaseError } from "../BaseError";

  
export class POICategoryNotFoundError extends BaseError {
    constructor(categoryId: number, context?: string) {
      super(
        `POI Category with ID ${categoryId} was not found.`,
        'POI_CATEGORY_NOT_FOUND',
        404,
        { categoryId },
        context || 'POICategoryService',
        'Please ensure the POI Category ID exists and is correct.'
      );
    }
  }
  