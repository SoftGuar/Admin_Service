import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

// Common schema for dispositive data
const dispositiveProperties = {
  id: Type.Number(),
  type: Type.String(),
  start_date: Type.String({ format: 'date-time' }),
  end_date: Type.String({ format: 'date-time' }),
  initial_state: Type.String(),
  MAC: Type.String(),
  state: Type.String(),
  user_id: Type.Union([Type.Number(), Type.Null()]),
  product_id: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};

// Product data included in responses
const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};

export const createDispositiveSchema = {
  tags : ['Dispositives'],
  body: Type.Object({
    type: Type.String(),
    start_date: Type.String({ format: 'date-time' }),
    end_date: Type.String({ format: 'date-time' }),
    initial_state: Type.String(),
    MAC: Type.String(),
    state: Type.String(),
    product_id: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    ...CommonErrorResponses,
  }
};

export const getDispositivesSchema = {
  tags : ['Dispositives'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          ...dispositiveProperties,
          Product: Type.Object(productProperties)
        })
      )
    })
  }
};

export const getDispositiveByIdSchema = {
  tags : ['Dispositives'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    ...CommonErrorResponses,
  }
};

export const getDispositivesByProductSchema = {
  tags : ['Dispositives'],
  params: Type.Object({
    productId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          ...dispositiveProperties,
          Product: Type.Object(productProperties)
        })
      )
    }),
    ...CommonErrorResponses,
  }
};

export const updateDispositiveSchema = {
  tags : ['Dispositives'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      type: Type.String(),
      start_date: Type.String({ format: 'date-time' }),
      end_date: Type.String({ format: 'date-time' }),
      initial_state: Type.String(),
      MAC: Type.String(),
      state: Type.String(),
      product_id: Type.Number()
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    ...CommonErrorResponses,
  }
};

export const assignUserSchema = {
  tags : ['Dispositives'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    user_id: Type.Union([Type.Number(), Type.Null()])
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    ...CommonErrorResponses,
  }
};

export const blockDispositiveSchema = {
  tags : ['Dispositives'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    blocked: Type.Boolean(),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    ...CommonErrorResponses,
  }
};

export const deleteDispositiveSchema = {
  tags : ['Dispositives'],
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