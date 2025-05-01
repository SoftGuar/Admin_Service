import { BaseError } from "../BaseError";

export class POINotFoundError extends BaseError {
    constructor(poiId: number, context?: string) {
      super(
        `POI with ID ${poiId} was not found.`,
        'POI_NOT_FOUND',
        404,
        { poiId },
        context || 'POIService',
        'Please ensure the POI ID exists and is correct.'
      );
    }
  }
