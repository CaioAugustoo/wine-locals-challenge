import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindRestaurantByIdControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: "Find a restaurant by it's ID",
  });

  const successResponse = ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        ok: true,
        error: false,
        message: null,
        data: {
          id: '23f70675-6bae-48b8-815c-95fbbce6691d',
          name: 'XXXX',
          createdAt: '2021-08-01T00:00:00.000Z',
          totalDishes: 12,
        },
      },
    },
  });

  const notFoundResponse = ApiResponse({
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

  const params = ApiParam({
    name: 'id',
    type: 'string',
    description: 'Restaurant ID',
    example: '23f70675-6bae-48b8-815c-95fbbce6691d',
  });

  return applyDecorators(summary, params, successResponse, notFoundResponse);
}
