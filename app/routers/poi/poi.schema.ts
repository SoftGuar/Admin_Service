import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

// POI Category schemas
export const createPOICategorySchema = {
  tags: ['POICategories'],
  body: Type.Object({
    name: Type.String()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        name: Type.String(),
        pois: Type.Array(
          Type.Object({
            id: Type.Number(),
            coordinates: Type.String(),
            poiCategoryId: Type.Number(),
            name: Type.String(),
            description: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const getPOICategoriesSchema = {
  tags: ['POICategories'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          name: Type.String(),
          pois: Type.Array(
            Type.Object({
              id: Type.Number(),
              coordinates: Type.String(),
              poiCategoryId: Type.Number(),
              name: Type.String(),
              description: Type.String()
            })
          )
        })
      )
    })
  }
};

export const getPOICategoryByIdSchema = {
  tags: ['POICategories'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        name: Type.String(),
        pois: Type.Array(
          Type.Object({
            id: Type.Number(),
            coordinates: Type.String(),
            poiCategoryId: Type.Number(),
            name: Type.String(),
            description: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const updatePOICategorySchema = {
  tags: ['POICategories'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        name: Type.String(),
        pois: Type.Array(
          Type.Object({
            id: Type.Number(),
            coordinates: Type.String(),
            poiCategoryId: Type.Number(),
            name: Type.String(),
            description: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const deletePOICategorySchema = {
  tags: ['POICategories'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    ...CommonErrorResponses
  }
};

// POI schemas
export const createPOISchema = {
  tags: ['POIs'],
  body: Type.Object({
    coordinates: Type.String(),
    poiCategoryId: Type.Number(),
    name: Type.String(),
    description: Type.String(),
    zones: Type.Optional(Type.Array(Type.Number()))
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        coordinates: Type.String(),
        poiCategoryId: Type.Number(),
        name: Type.String(),
        description: Type.String(),
        category: Type.Object({
          id: Type.Number(),
          name: Type.String()
        }),
        zones: Type.Array(
          Type.Object({
            id: Type.Number(),
            environmentId: Type.Number(),
            zoneType: Type.String(),
            limitsType: Type.String(),
            color: Type.String(),
            icon: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const getPOIsSchema = {
  tags: ['POIs'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          coordinates: Type.String(),
          poiCategoryId: Type.Number(),
          name: Type.String(),
          description: Type.String(),
          category: Type.Object({
            id: Type.Number(),
            name: Type.String()
          }),
          zones: Type.Array(
            Type.Object({
              id: Type.Number(),
              environmentId: Type.Number(),
              zoneType: Type.String(),
              limitsType: Type.String(),
              color: Type.String(),
              icon: Type.String()
            })
          )
        })
      )
    })
  }
};

export const getPOIByIdSchema = {
  tags: ['POIs'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        coordinates: Type.String(),
        poiCategoryId: Type.Number(),
        name: Type.String(),
        description: Type.String(),
        category: Type.Object({
          id: Type.Number(),
          name: Type.String()
        }),
        zones: Type.Array(
          Type.Object({
            id: Type.Number(),
            environmentId: Type.Number(),
            zoneType: Type.String(),
            limitsType: Type.String(),
            color: Type.String(),
            icon: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const getPOIsByCategorySchema = {
  tags: ['POIs'],
  params: Type.Object({
    categoryId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          coordinates: Type.String(),
          poiCategoryId: Type.Number(),
          name: Type.String(),
          description: Type.String(),
          category: Type.Object({
            id: Type.Number(),
            name: Type.String()
          }),
          zones: Type.Array(
            Type.Object({
              id: Type.Number(),
              environmentId: Type.Number(),
              zoneType: Type.String(),
              limitsType: Type.String(),
              color: Type.String(),
              icon: Type.String()
            })
          )
        })
      )
    }),
    ...CommonErrorResponses
  }
};

export const getPOIsByZoneSchema = {
  tags: ['POIs'],
  params: Type.Object({
    zoneId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          coordinates: Type.String(),
          poiCategoryId: Type.Number(),
          name: Type.String(),
          description: Type.String(),
          category: Type.Object({
            id: Type.Number(),
            name: Type.String()
          }),
          zones: Type.Array(
            Type.Object({
              id: Type.Number(),
              environmentId: Type.Number(),
              zoneType: Type.String(),
              limitsType: Type.String(),
              color: Type.String(),
              icon: Type.String()
            })
          )
        })
      )
    }),
    ...CommonErrorResponses
  }
};

export const updatePOISchema = {
  tags: ['POIs'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      coordinates: Type.String(),
      poiCategoryId: Type.Number(),
      name: Type.String(),
      description: Type.String(),
      zones: Type.Array(Type.Number())
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        coordinates: Type.String(),
        poiCategoryId: Type.Number(),
        name: Type.String(),
        description: Type.String(),
        category: Type.Object({
          id: Type.Number(),
          name: Type.String()
        }),
        zones: Type.Array(
          Type.Object({
            id: Type.Number(),
            environmentId: Type.Number(),
            zoneType: Type.String(),
            limitsType: Type.String(),
            color: Type.String(),
            icon: Type.String()
          })
        )
      })
    }),
    ...CommonErrorResponses
  }
};

export const deletePOISchema = {
  tags: ['POIs'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    ...CommonErrorResponses
  }
};