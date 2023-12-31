import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { HttpResponses } from '../utils/responses';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    const apiKey = request.header('api_key');

    if (apiKey !== process.env.API_KEY) {
      HttpResponses.throwException('Invalid API Key', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
