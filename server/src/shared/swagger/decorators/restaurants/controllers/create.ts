import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateRestaurantControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: 'Create a new restaurant',
  });

  const successResponse = ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      example: {
        ok: true,
        error: null,
        message: null,
        data: {
          id: '23f70675-6bae-48b8-815c-95fbbce6691d',
          name: 'Silva Lanches',
        },
      },
    },
  });

  const alreadyExistsWithSameNameResponse = ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
      example: {
        ok: false,
        error: true,
        message: 'Restaurant "silva Lanches" already exists',
        data: null,
        status: HttpStatus.BAD_REQUEST,
      },
    },
  });

  return applyDecorators(
    summary,
    successResponse,
    alreadyExistsWithSameNameResponse,
  );
}
