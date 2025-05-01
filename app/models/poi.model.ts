import prisma from "../services/prismaService";

// POI Category model
export interface CreatePOICategoryInput {
name: string;
}

export interface UpdatePOICategoryInput {
name?: string;
}

export const POICategoryModel = {
create: async (categoryData: CreatePOICategoryInput) => {
try {
return await prisma.pOICategory.create({
  data: categoryData,
  include: {
    pois: true
  }
});
} catch (error) {
console.error('Error creating POI Category:', error);
throw error;
}
},
findById: async (id: number) => {
try {
return await prisma.pOICategory.findUnique({
  where: { id },
  include: {
    pois: true
  }
});
} catch (error) {
console.error('Error finding POI Category by ID:', error);
throw error;
}
},
getAll: async () => {
try {
return await prisma.pOICategory.findMany({
  include: {
    pois: true
  }
});
} catch (error) {
console.error('Error getting all POI Categories:', error);
throw error;
}
},
update: async (id: number, categoryData: UpdatePOICategoryInput) => {
try {
return await prisma.pOICategory.update({
  where: { id },
  data: categoryData,
  include: {
    pois: true
  }
});
} catch (error) {
console.error('Error updating POI Category:', error);
throw error;
}
},
delete: async (id: number) => {
try {
return await prisma.pOICategory.delete({
  where: { id }
});
} catch (error) {
console.error('Error deleting POI Category:', error);
throw error;
}
}
};

// POI model
export interface CreatePOIInput {
coordinates: string;
poiCategoryId: number;
name: string;
description: string;
zones?: number[];  // Array of zone IDs to associate with this POI
}

export interface UpdatePOIInput {
coordinates?: string;
poiCategoryId?: number;
name?: string;
description?: string;
zones?: number[];  // Array of zone IDs to associate with this POI
}

export const POIModel = {
create: async (poiData: CreatePOIInput) => {
try {
const { zones, ...poiDetails } = poiData;

// Create POI with its basic details
const newPoi = await prisma.pOI.create({
  data: {
    ...poiDetails,
    // If zones are provided, connect them
    ...(zones && zones.length > 0 ? {
      zones: {
        connect: zones.map(zoneId => ({ id: zoneId }))
      }
    } : {})
  },
  include: {
    category: true,
    zones: true
  }
});

return newPoi;
} catch (error) {
console.error('Error creating POI:', error);
throw error;
}
},
findById: async (id: number) => {
try {
return await prisma.pOI.findUnique({
  where: { id },
  include: {
    category: true,
    zones: true
  }
});
} catch (error) {
console.error('Error finding POI by ID:', error);
throw error;
}
},
getAll: async () => {
try {
return await prisma.pOI.findMany({
  include: {
    category: true,
    zones: true
  }
});
} catch (error) {
console.error('Error getting all POIs:', error);
throw error;
}
},
findByCategory: async (categoryId: number) => {
try {
return await prisma.pOI.findMany({
  where: { poiCategoryId: categoryId },
  include: {
    category: true,
    zones: true
  }
});
} catch (error) {
console.error('Error finding POIs by category ID:', error);
throw error;
}
},
findByZone: async (zoneId: number) => {
try {
return await prisma.pOI.findMany({
  where: {
    zones: {
      some: {
        id: zoneId
      }
    }
  },
  include: {
    category: true,
    zones: true
  }
});
} catch (error) {
console.error('Error finding POIs by zone ID:', error);
throw error;
}
},
update: async (id: number, poiData: UpdatePOIInput) => {
try {
const { zones, ...poiDetails } = poiData;

// Update POI with basic details first
const updatedPoi = await prisma.pOI.update({
  where: { id },
  data: {
    ...poiDetails,
    // If updating zone connections
    ...(zones ? {
      zones: {
        set: zones.map(zoneId => ({ id: zoneId }))
      }
    } : {})
  },
  include: {
    category: true,
    zones: true
  }
});

return updatedPoi;
} catch (error) {
console.error('Error updating POI:', error);
throw error;
}
},
delete: async (id: number) => {
try {
return await prisma.pOI.delete({
  where: { id }
});
} catch (error) {
console.error('Error deleting POI:', error);
throw error;
}
}
};