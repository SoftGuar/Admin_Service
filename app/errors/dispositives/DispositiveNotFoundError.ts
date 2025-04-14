import { BaseError } from '../BaseError';

export class DispositiveNotFoundError extends BaseError {
  constructor(dispositiveId: number, context?: string) {
    super(
      `Dispositive with ID ${dispositiveId} was not found.`,
      'DISPOSITIVE_NOT_FOUND',
      404,
      { dispositiveId },
      context || 'DispositiveService',
      'Please ensure the dispositive ID exists and is correct.'
    );
  }
}

