import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

// Common schema for object data
const objectProperties = {
  id: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
};

export const createObjectSchema = {
  tags: ['Objects'],
  body: Type.Object({}), // No required properties for creation as per your model
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(objectProperties)
    }),
    ...CommonErrorResponses,
  }
};

export const getObjectsSchema = {
  tags: ['Objects'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object(objectProperties)
      )
    })
  }
};

export const getObjectByIdSchema = {
  tags: ['Objects'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(objectProperties)
    }),
    ...CommonErrorResponses,
  }
};

export const updateObjectSchema = {
  tags: ['Objects'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({}), // No required properties for update
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(objectProperties)
    }),
    ...CommonErrorResponses,
  }
};

export const deleteObjectSchema = {
  tags: ['Objects'],
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