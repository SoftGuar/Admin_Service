import { BaseError } from '../BaseError';

export class ProductNotFoundError extends BaseError {
  constructor(productId: number, context?: string) {
    super(
      `Product with ID ${productId} was not found.`,
      'PRODUCT_NOT_FOUND',
      404,
      { productId },
      context || 'DispositiveService',
      'Please ensure the product ID exists and is correct.'
    );
  }
}