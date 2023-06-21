import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { FindRestaurantByNameDtoOutput } from './dto/find-restaurant-by-name.dto';
import { IRestaurantsRepository } from './interfaces/restaurants.repository';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RedisRestaurantRepository implements IRestaurantsRepository {
  public constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly restaurantsRepository: RestaurantsRepository,
  ) {}

  private async createRestaurantCacheByName(
    restaurant: CreateRestaurantDtoOutput,
  ): Promise<void> {
    await this.redis.set(
      `restaurants:${restaurant.name}`,
      JSON.stringify(restaurant),
    );
  }

  private async createRestaurantCacheById(
    restaurant: CreateRestaurantDtoOutput,
  ): Promise<void> {
    await this.redis.set(
      `restaurants:${restaurant.id}`,
      JSON.stringify(restaurant),
    );
  }

  public async create(
    dto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDtoOutput> {
    const createdRestaurant = await this.restaurantsRepository.create(dto);

    await Promise.all([
      this.createRestaurantCacheByName(createdRestaurant),
      this.createRestaurantCacheById(createdRestaurant),
    ]);

    const { id, name } = createdRestaurant;

    return { id, name };
  }

  public async findByName(
    name: string,
  ): Promise<FindRestaurantByNameDtoOutput> {
    const cachedRestaurant = await this.redis.get(`restaurants:${name}`);

    console.log(cachedRestaurant);

    if (cachedRestaurant) {
      return JSON.parse(cachedRestaurant);
    }

    return this.restaurantsRepository.findByName(name);
  }
}
