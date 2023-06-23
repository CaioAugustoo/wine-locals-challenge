import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  CreateRestaurantControllerSwaggerDocs,
  CreateRestaurantDishControllerSwaggerDocs,
  FindRestaurantByIdControllerSwaggerDocs,
  ListAllRestaurantDishesControllerSwaggerDocs,
  ListAllRestaurantsControllerSwaggerDocs,
} from '../../shared/swagger';
import { HttpResponses } from '../../shared/utils/responses';
import { DishesService } from '../dishes/dishes.service';
import { CreateDishDto } from '../dishes/dto/create-dish.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@ApiSecurity('api_key')
@ApiTags('Restaurants')
@Controller('restaurants')
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
  @FindRestaurantByIdControllerSwaggerDocs()
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
  @ListAllRestaurantDishesControllerSwaggerDocs()
  @Get(':id/dishes')
  public async listAllDishes(
    @Param() params: { id: string },
    @Query()
    query: {
      page: number;
    },
  ) {
    try {
      const dishes = await this.dishesService.listAll({
        restaurantId: params.id,
        page: query.page,
      });

      return HttpResponses.parseSuccess(dishes, HttpStatus.OK);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ListAllRestaurantsControllerSwaggerDocs()
  @Get()
  public async listAllRestaurants(
    @Query()
    query: {
      page: number;
    },
  ) {
    try {
      const restaurants = await this.restaurantsService.listAll({
        page: query.page,
      });

      return HttpResponses.parseSuccess(restaurants, HttpStatus.OK);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }

  @HttpCode(HttpStatus.OK)
  @CreateRestaurantDishControllerSwaggerDocs()
  @Post(':id/dishes')
  public async createDish(
    @Param() params: { id: string },
    @Body() body: Omit<CreateDishDto, 'restaurantId'>,
  ) {
    try {
      const dish = await this.dishesService.create({
        ...body,
        restaurantId: params.id,
      });

      return HttpResponses.parseSuccess(dish, HttpStatus.CREATED);
    } catch (err) {
      HttpResponses.throwException(err, err?.status);
    }
  }
}
