import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { GET_RESTAURANTS_CACHE_KEY } from '../../shared/constants/cache';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { FindRestaurantByIdOutput } from './dto/find-restaurant-by-id.dto';
import { FindRestaurantByNameDtoOutput } from './dto/find-restaurant-by-name.dto';
import { IRestaurantsRepository } from './interfaces/restaurants.repository';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RedisRestaurantRepository implements IRestaurantsRepository {
  public constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly restaurantsRepository: RestaurantsRepository,
  ) {}

  private async insertIntoCache(
    restaurant: CreateRestaurantDtoOutput,
    key: 'id' | 'name' = 'id',
  ): Promise<void> {
    if (!restaurant?.[key]) {
      return;
    }

    await this.redis.set(
      GET_RESTAURANTS_CACHE_KEY(restaurant[key]),
      JSON.stringify(restaurant),
    );
  }

  private async getFromCache<T>(value: string): Promise<T | null> {
    const cachedRestaurant = await this.redis.get(
      GET_RESTAURANTS_CACHE_KEY(value),
    );

    return cachedRestaurant ? JSON.parse(cachedRestaurant) : null;
  }

  public async findById(id: string): Promise<FindRestaurantByIdOutput> {
    if (!id) {
      return null;
    }

    const cachedRestaurant = await this.getFromCache<FindRestaurantByIdOutput>(
      id,
    );

    if (!cachedRestaurant) {
      const foundRestaurant = await this.restaurantsRepository.findById(id);

      await this.insertIntoCache(foundRestaurant);
      return foundRestaurant;
    }

    return cachedRestaurant;
  }

  public async create(
    dto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDtoOutput> {
    const createdRestaurant = await this.restaurantsRepository.create(dto);

    const data = {
      ...createdRestaurant,
      totalDishes: 0,
    };

    await Promise.all([
      this.insertIntoCache(data, 'id'),
      this.insertIntoCache(data, 'name'),
    ]);

    return data;
  }

  public async findByName(
    name: string,
  ): Promise<FindRestaurantByNameDtoOutput> {
    const cachedRestaurant =
      await this.getFromCache<FindRestaurantByNameDtoOutput>(name);

    if (!cachedRestaurant) {
      const foundRestaurant = await this.restaurantsRepository.findByName(name);

      await this.insertIntoCache(foundRestaurant, 'name');
      return foundRestaurant;
    }

    return cachedRestaurant;
  }
}
