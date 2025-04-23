import { Type } from '@sinclair/typebox';

const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};

export const createProductSchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    price: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(productProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const getProductsSchema = {
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(productProperties))
    })
  }
};

export const getProductByIdSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...productProperties,
        Dispositive: Type.Array(Type.Object({
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
  
        }))
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateProductSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      name: Type.String(),
      description: Type.Union([Type.String(), Type.Null()]),
      price: Type.Number()
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(productProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const deleteProductSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};