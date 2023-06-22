import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '../../shared/exceptions/http';
import { Zod } from '../../shared/utils/zod/validations';
import { RestaurantsService } from '../restaurants/restaurants.service';
import {
  CreateDishDto,
  CreateDishDtoOutput,
  createDishDtoSchema,
} from './dto/create-dish.dto';
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

  public async create(dto: CreateDishDto): Promise<CreateDishDtoOutput> {
    const payload = Zod.parseAndValidate(createDishDtoSchema, dto);

    await this.restaurantsService.findById(payload.restaurantId);

    return this.redisDishesRepository.create(payload);
  }

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
