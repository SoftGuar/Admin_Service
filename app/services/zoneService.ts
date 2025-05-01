import { ZoneModel, CreateZoneInput, UpdateZoneInput } from '../models/zone.model';
import { ZoneNotFoundError } from '../errors/zones/ZoneNotFoundError';

export const ZoneService = {
  createZone: async (zoneData: CreateZoneInput) => {
    return ZoneModel.create(zoneData);
  },

  getZoneById: async (id: number) => {
    const zone = await ZoneModel.findById(id);
    if (!zone) {
      throw new ZoneNotFoundError(id, 'ZoneService.getZoneById');
    }

    return zone;
  },

  getAllZones: async () => {
    return ZoneModel.getAll();
  },

  updateZone: async (id: number, zoneData: UpdateZoneInput) => {
    const existingZone = await ZoneModel.findById(id);
    if (!existingZone) {
      throw new ZoneNotFoundError(id, 'ZoneService.updateZone');
    }

    return ZoneModel.update(id, zoneData);
  },

  deleteZone: async (id: number) => {
    const existingZone = await ZoneModel.findById(id);
    if (!existingZone) {
      throw new ZoneNotFoundError(id, 'ZoneService.deleteZone');
    }

    return ZoneModel.delete(id);
  },
};