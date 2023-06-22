import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '../../shared/exceptions/http';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ListDishesDtoOutput } from './dto/list-restaurants-dishes.dto';
import { RedisDishesRepository } from './redis.repository';

@Injectable()
export class DishesService {
  constructor(
    private readonly redisDishesRepository: RedisDishesRepository,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  public async listAll(restaurantId: string): Promise<ListDishesDtoOutput> {
    if (!restaurantId) {
      throw new HttpException(
        'Restaurant ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.restaurantsService.findById(restaurantId);

    return this.redisDishesRepository.listAll(restaurantId);
  }
}
