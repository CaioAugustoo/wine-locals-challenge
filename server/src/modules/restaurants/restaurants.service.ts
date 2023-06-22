import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
  createRestaurantDtoSchema,
} from './dto/create-restaurant.dto';

import { HttpException } from '../../shared/exceptions';
import { Zod } from '../../shared/utils/zod/validations';
import { RedisDishesRepository } from '../dishes/redis.repository';
import { FindRestaurantWithTotalDishesOutput } from './dto/find-restaurant-by-id.dto';
import { RedisRestaurantRepository } from './redis.repository';

@Injectable()
export class RestaurantsService {
  public constructor(
    private readonly redisRestaurantRepository: RedisRestaurantRepository,
    private readonly redisDishesRepository: RedisDishesRepository,
  ) {}

  public async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDtoOutput> {
    const payload = Zod.parseAndValidate(
      createRestaurantDtoSchema,
      createRestaurantDto,
    );

    const alreadyExistsRestaurant =
      await this.alreadyExistsRestaurantWithSameName(payload.name);

    if (alreadyExistsRestaurant) {
      throw new HttpException(
        `Restaurant "${payload.name}" already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.redisRestaurantRepository.create(payload);
  }

  public async findById(
    id: string,
  ): Promise<FindRestaurantWithTotalDishesOutput> {
    const foundRestaurant = await this.redisRestaurantRepository.findById(id);

    if (!foundRestaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    const totalDishes = await this.redisDishesRepository.countTotal(id);

    return {
      totalDishes,
      ...foundRestaurant,
    };
  }

  public async alreadyExistsRestaurantWithSameName(
    name: string,
  ): Promise<boolean> {
    const foundRestaurantByName =
      await this.redisRestaurantRepository.findByName(name);

    if (!foundRestaurantByName) {
      return false;
    }

    return foundRestaurantByName.name === name;
  }
}
