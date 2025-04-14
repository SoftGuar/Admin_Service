import { BaseError } from '../BaseError';

export class InvalidProductPriceError extends BaseError {
  constructor(price: number, context?: string) {
    super(
      `Product price must be positive. Received: ${price}.`,
      'INVALID_PRODUCT_PRICE',
      400,
      { price },
      context || 'ProductService',
      'Provide a product price greater than zero.'
    );
  }
}