import { LimitsType, ZoneType } from '@prisma/client';
import prisma from '../services/prismaService';

export interface CreateZoneInput {
  environmentId: number;
  zoneType: ZoneType; 
  limitsType: LimitsType; 
  color: string;
  icon: string;
}

export interface UpdateZoneInput {
  environmentId?: number;
  zoneType?: ZoneType; 
  limitsType?: LimitsType; 
  color?: string;
  icon?: string;
}

export const ZoneModel = {
  // Create a new zone
  create: async (zoneData: CreateZoneInput) => {
    try {
      return await prisma.zone.create({
        data: zoneData,
      });
    } catch (error) {
      console.error('Error creating zone:', error);
      throw error;
    }
  },

  // Find a zone by ID
  findById: async (id: number) => {
    try {
      return await prisma.zone.findUnique({
        where: { id },
        include: {
          environment: true,
          circularLimits: true,
          polygonLimits: true,
          pointsLimits: true,
          elementsLimits: true,
          pois: true,
        },
      });
    } catch (error) {
      console.error('Error finding zone by ID:', error);
      throw error;
    }
  },

  // Get all zones
  getAll: async () => {
    try {
      return await prisma.zone.findMany({
        include: {
          environment: true,
          circularLimits: true,
          polygonLimits: true,
          pointsLimits: true,
          elementsLimits: true,
          pois: true,
        },
      });
    } catch (error) {
      console.error('Error getting all zones:', error);
      throw error;
    }
  },

  // Update a zone
  update: async (id: number, zoneData: UpdateZoneInput) => {
    try {
      return await prisma.zone.update({
        where: { id },
        data: zoneData,
      });
    } catch (error) {
      console.error('Error updating zone:', error);
      throw error;
    }
  },

  // Delete a zone
  delete: async (id: number) => {
    try {
      return await prisma.zone.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting zone:', error);
      throw error;
    }
  },
};