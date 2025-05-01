export class ZoneNotFoundError extends Error {
    constructor(zoneId: number, methodName: string) {
      super(`Zone with ID ${zoneId} not found in ${methodName}`);
      this.name = 'ZoneNotFoundError';
    }
  }