import { BaseError } from '../BaseError';

export class EnvironmentNotFoundError extends BaseError {
  constructor(environmentId: number, source: string) {
    super(
      'environment_not_found',
      `Environment with ID ${environmentId} not found`,
      404,
      source
    );
  }
}