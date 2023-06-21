import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetHelloWorldAppControllerSwaggerDocs() {
  const summary = ApiOperation({
    summary: 'Get Hello World',
  });

  const successResponse = ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      example: {
        ok: true,
        error: null,
        message: null,
        data: 'Hello World!',
        status: 200,
      },
    },
  });

  return applyDecorators(summary, successResponse);
}
