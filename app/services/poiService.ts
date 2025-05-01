import { POICategoryNotFoundError } from "../errors/poi/POICategoryNotFoundError";
import { POINotFoundError } from "../errors/poi/POINotFoundError";
import { ZoneNotFoundError } from "../errors/zones/ZoneNotFoundError";
import { CreatePOICategoryInput, CreatePOIInput, POICategoryModel, POIModel, UpdatePOICategoryInput, UpdatePOIInput } from "../models/poi.model";
import { ZoneModel } from "../models/zone.model";

export const POICategoryService = {
  async createPOICategory(categoryData: CreatePOICategoryInput) {
    return POICategoryModel.create(categoryData);
  },

  async getPOICategoryById(id: number) {
    const category = await POICategoryModel.findById(id);
    if (!category) {
      throw new POICategoryNotFoundError(id, 'POICategoryService.getPOICategoryById');
    }
    return category;
  },

  async getAllPOICategories() {
    return POICategoryModel.getAll();
  },

  async updatePOICategory(id: number, categoryData: UpdatePOICategoryInput) {
    const existingCategory = await POICategoryModel.findById(id);
    if (!existingCategory) {
      throw new POICategoryNotFoundError(id, 'POICategoryService.updatePOICategory');
    }
    return POICategoryModel.update(id, categoryData);
  },

  async deletePOICategory(id: number) {
    const existingCategory = await POICategoryModel.findById(id);
    if (!existingCategory) {
      throw new POICategoryNotFoundError(id, 'POICategoryService.deletePOICategory');
    }
    return POICategoryModel.delete(id);
  }
};

export const POIService = {
  async createPOI(poiData: CreatePOIInput) {
    // Check if category exists
    const category = await POICategoryModel.findById(poiData.poiCategoryId);
    if (!category) {
      throw new POICategoryNotFoundError(poiData.poiCategoryId, 'POIService.createPOI');
    }

    // If zones are provided, check if they all exist
    if (poiData.zones && poiData.zones.length > 0) {
      const missingZones: number[] = [];
      for (const zoneId of poiData.zones) {
        const zone = await ZoneModel.findById(zoneId);
        if (!zone) {
          missingZones.push(zoneId);
        }
      }
      if (missingZones.length > 0) {
        throw new ZoneNotFoundError(
          missingZones[0],
          'POIService.createPOI'
        );
      }
    }

    return POIModel.create(poiData);
  },

  async getPOIById(id: number) {
    const poi = await POIModel.findById(id);
    if (!poi) {
      throw new POINotFoundError(id, 'POIService.getPOIById');
    }
    return poi;
  },

  async getAllPOIs() {
    return POIModel.getAll();
  },

  async getPOIsByCategory(categoryId: number) {
    // Check if category exists
    const category = await POICategoryModel.findById(categoryId);
    if (!category) {
      throw new POICategoryNotFoundError(categoryId, 'POIService.getPOIsByCategory');
    }
    return POIModel.findByCategory(categoryId);
  },

  async getPOIsByZone(zoneId: number) {
    // Check if zone exists
    const zone = await ZoneModel.findById(zoneId);
    if (!zone) {
      throw new ZoneNotFoundError(zoneId, 'POIService.getPOIsByZone');
    }
    return POIModel.findByZone(zoneId);
  },

  async updatePOI(id: number, poiData: UpdatePOIInput) {
    const existingPOI = await POIModel.findById(id);
    if (!existingPOI) {
      throw new POINotFoundError(id, 'POIService.updatePOI');
    }

    // If updating category, check if it exists
    if (poiData.poiCategoryId) {
      const category = await POICategoryModel.findById(poiData.poiCategoryId);
      if (!category) {
        throw new POICategoryNotFoundError(poiData.poiCategoryId, 'POIService.updatePOI');
      }
    }

    // If updating zones, check if they all exist
    if (poiData.zones && poiData.zones.length > 0) {
      const missingZones: number[] = [];
      for (const zoneId of poiData.zones) {
        const zone = await ZoneModel.findById(zoneId);
        if (!zone) {
          missingZones.push(zoneId);
        }
      }
      if (missingZones.length > 0) {
        throw new ZoneNotFoundError(
          missingZones[0],
          'POIService.updatePOI'
        );
      }
    }

    return POIModel.update(id, poiData);
  },

  async deletePOI(id: number) {
    const existingPOI = await POIModel.findById(id);
    if (!existingPOI) {
      throw new POINotFoundError(id, 'POIService.deletePOI');
    }
    return POIModel.delete(id);
  }
};