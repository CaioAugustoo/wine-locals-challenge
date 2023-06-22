import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '../../shared/exceptions/http';
import { RestaurantsService } from '../restaurants/restaurants.service';
import {
  ListDishesDto,
  PaginatedDishesDtoOutput,
} from './dto/list-all-dishes.dto';
import { RedisDishesRepository } from './redis.repository';

@Injectable()
export class DishesService {
  constructor(
    private readonly redisDishesRepository: RedisDishesRepository,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  public async listAll(dto: ListDishesDto): Promise<PaginatedDishesDtoOutput> {
    if (!dto?.restaurantId) {
      throw new HttpException(
        'Restaurant ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.restaurantsService.findById(dto.restaurantId);

    const [totalCount, dishes] = await Promise.all([
      this.redisDishesRepository.countTotal(dto.restaurantId),
      this.redisDishesRepository.listAll(dto),
    ]);

    const output: PaginatedDishesDtoOutput = {
      dishes: dishes,
      totalCount,
    };

    return output;
  }
}
