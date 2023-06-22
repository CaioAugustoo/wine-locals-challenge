import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRestaurantControllerSwaggerDocs } from '../../shared/swagger';
import { HttpResponses } from '../../shared/utils/responses';
import { DishesService } from '../dishes/dishes.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  public constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly dishesService: DishesService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @CreateRestaurantControllerSwaggerDocs()
  @Post()
  public async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant = await this.restaurantsService.create(
        createRestaurantDto,
      );

      return HttpResponses.parseSuccess(restaurant, HttpStatus.CREATED);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findById(@Param() params: { id: string }) {
    try {
      const restaurant = await this.restaurantsService.findById(params.id);

      return HttpResponses.parseSuccess(restaurant, HttpStatus.OK);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id/dishes')
  public async listAllDishes(@Param() restaurantId: string) {
    try {
      const dishes = await this.dishesService.listAll(restaurantId);

      return HttpResponses.parseSuccess(dishes, HttpStatus.OK);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }
}
