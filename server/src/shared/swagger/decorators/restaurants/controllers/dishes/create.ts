import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function CreateRestaurantDishControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: "Create a new restaurant's dish",
  });

  const successResponse = ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      example: {
        ok: true,
        error: false,
        message: null,
        data: {
          id: '1c871953-1f04-44ea-ac15-e5daba54b17b',
          name: 'XXXX',
          description: 'XXXX',
          price: 100,
          createdAt: '2023-06-22T06:31:12.588Z',
          restaurantId: 'aa156cc5-1e7b-4aca-b7a6-2385dd66bbca',
        },
      },
    },
  });

  const restaurantNotFoundResponse = ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      example: {
        ok: false,
        error: true,
        message: 'Restaurant not found',
        data: null,
        status: HttpStatus.NOT_FOUND,
      },
    },
  });

  const payload = ApiBody({
    schema: {
      example: {
        name: 'My Dish',
        description: 'My Dish Description',
        price: 100,
      },
    },
  });

  const params = ApiParam({
    name: 'id',
    type: 'string',
    description: 'Restaurant ID',
    example: '23f70675-6bae-48b8-815c-95fbbce6691d',
  });

  return applyDecorators(
    summary,
    payload,
    params,
    successResponse,
    restaurantNotFoundResponse,
  );
}
