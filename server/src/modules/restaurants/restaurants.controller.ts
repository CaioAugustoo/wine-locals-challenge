import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRestaurantControllerSwaggerDocs } from '../../shared/swagger';
import { HttpResponses } from '../../shared/utils/responses';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  public constructor(private readonly restaurantsService: RestaurantsService) {}

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
}
