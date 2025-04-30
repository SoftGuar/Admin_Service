import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

// Common schema for environment data
const environmentProperties = {
  id: Type.Number(),
  userId: Type.Number(),
};

// Zone data included in responses
const zoneProperties = {
  id: Type.Number(),
  environmentId: Type.Number(),
  zoneType: Type.String(),
  limitsType: Type.String(),
  color: Type.String(),
  icon: Type.String()
};

// Environment element data
const environmentElementProperties = {
  environmentId: Type.Number(),
  objectId: Type.Number()
};

export const createEnvironmentSchema = {
  tags: ['Environments'],
  body: Type.Object({
    userId: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(environmentProperties)
    }),
    ...CommonErrorResponses,
  }
};

export const getEnvironmentsSchema = {
  tags: ['Environments'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object({
        ...environmentProperties,
        zones: Type.Array(Type.Object(zoneProperties)),
        elements: Type.Array(Type.Object(environmentElementProperties))
      }))
       
    })
  }
};

export const getEnvironmentByIdSchema = {
  tags: ['Environments'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...environmentProperties,
        zones: Type.Array(Type.Object(zoneProperties)),
        elements: Type.Array(Type.Object(environmentElementProperties))
      })
    }),
    ...CommonErrorResponses,
  }
};

export const getEnvironmentsByUserSchema = {
  tags: ['Environments'],
  params: Type.Object({
    userId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object(environmentProperties)
      )
    }),
    ...CommonErrorResponses,
  }
};

export const updateEnvironmentSchema = {
  tags: ['Environments'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    userId: Type.Optional(Type.Number())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(environmentProperties)
    }),
    ...CommonErrorResponses,
  }
};

export const deleteEnvironmentSchema = {
  tags: ['Environments'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    ...CommonErrorResponses,
  }
};