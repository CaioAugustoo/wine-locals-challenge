import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DEFAULT_PAGINATION_PAGE } from '../../../../constants/pagination';

export function ListAllRestaurantsControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: 'List all restaurants',
  });

  const successResponse = ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        ok: true,
        error: false,
        message: null,
        data: {
          restaurants: [
            {
              id: '513c955c-d39e-404b-b9a9-834c71877684',
              name: 'Canal Café',
              _count: {
                dish: 0,
              },
            },
            {
              id: 'eedff071-b511-43b8-9060-703f75743b79',
              name: 'Z Café',
              _count: {
                dish: 0,
              },
            },
            {
              id: 'aa156cc5-1e7b-4aca-b7a6-2385dd66bbca',
              name: 'Silva Lanches',
              _count: {
                dish: 7,
              },
            },
          ],
          totalCount: 1,
        },
      },
    },
  });

  const pageQuery = ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: `Page number. Default is ${DEFAULT_PAGINATION_PAGE}`,
    example: 1,
  });

  return applyDecorators(summary, successResponse, pageQuery);
}
