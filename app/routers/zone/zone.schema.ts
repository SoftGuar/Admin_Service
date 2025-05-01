import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';
import { ZoneType, LimitsType } from '@prisma/client';

// Convert Prisma enums to TypeBox-compatible enums
const ZoneTypeEnum = Type.Enum(ZoneType);
const LimitsTypeEnum = Type.Enum(LimitsType);

const zoneProperties = {
  id: Type.Number(),
  environmentId: Type.Number(),
  zoneType: ZoneTypeEnum,
  limitsType: LimitsTypeEnum,
  color: Type.String(),
  icon: Type.String(),
};

export const createZoneSchema = {
  tags: ['Zones'],
  body: Type.Object({
    environmentId: Type.Number(),
    zoneType: ZoneTypeEnum,
    limitsType: LimitsTypeEnum,
    color: Type.String(),
    icon: Type.String(),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(zoneProperties),
    }),
    ...CommonErrorResponses,
  },
};

export const getZonesSchema = {
  tags: ['Zones'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(zoneProperties)),
    }),
  },
};

export const getZoneByIdSchema = {
  tags: ['Zones'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...zoneProperties,
        environment: Type.Object({
          id: Type.Number(),
          userId: Type.Number(),
        }),
        pois: Type.Array(Type.Object({
          id: Type.Number(),
          coordinates: Type.String(),
          name: Type.String(),
          description: Type.String(),
        })),
      }),
    }),
    ...CommonErrorResponses,
  },
};

export const updateZoneSchema = {
  tags: ['Zones'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Partial(
    Type.Object({
      environmentId: Type.Number(),
      zoneType: ZoneTypeEnum,
      limitsType: LimitsTypeEnum,
      color: Type.String(),
      icon: Type.String(),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(zoneProperties),
    }),
    ...CommonErrorResponses,
  },
};

export const deleteZoneSchema = {
  tags: ['Zones'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String(),
    }),
    ...CommonErrorResponses,
  },
};