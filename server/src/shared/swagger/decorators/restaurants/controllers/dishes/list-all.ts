import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DEFAULT_PAGINATION_PAGE } from '../../../../../constants/pagination';

export function ListAllRestaurantDishesControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: 'List all dishes from a restaurant',
  });

  const successResponse = ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        ok: true,
        error: null,
        message: null,
        data: {
          dishes: [
            {
              id: '9a085d81-b711-419a-8f8a-4094fa37a317',
              name: 'Lasanha',
              description: 'uma bela lasanha',
              price: 100,
              createdAt: '2023-06-22T05:20:45.035Z',
              restaurantId: 'bd2425a3-d941-4a5a-a01d-2472f85456c3',
            },
          ],
          totalCount: 1,
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

  const pageQuery = ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: `Page number. Default is ${DEFAULT_PAGINATION_PAGE}`,
    example: 1,
  });

  return applyDecorators(
    summary,
    params,
    successResponse,
    pageQuery,

    notFoundResponse,
  );
}
