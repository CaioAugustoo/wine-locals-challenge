import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetHelloWorldAppControllerSwaggerDocs } from 'src/shared';
import { HttpResponses } from '../../shared/utils/responses/http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('App')
  @HttpCode(HttpStatus.OK)
  @GetHelloWorldAppControllerSwaggerDocs()
  @Get()
  public async getHello() {
    try {
      return HttpResponses.parseSuccess(
        this.appService.getHello(),
        HttpStatus.OK,
      );
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }
}
