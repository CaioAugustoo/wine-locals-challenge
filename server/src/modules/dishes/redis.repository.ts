import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Dish } from '@prisma/client';
import { GET_RESTAURANT_DISHES_CACHE_KEY } from '../../shared/constants/cache';
import { DishesRepository } from './dishes.repository';
import { ListDishesDtoOutput } from './dto/list-restaurants-dishes.dto';
import { IDishesRepository } from './interfaces/dishes.repository';

@Injectable()
export class RedisDishesRepository implements IDishesRepository {
  public constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly dishesRepository: DishesRepository,
  ) {}

  private async insertIntoCache(restaurantId: string, dishes: Dish[]) {
    await this.redis.set(
      GET_RESTAURANT_DISHES_CACHE_KEY(restaurantId),
      JSON.stringify(dishes),
    );
  }

  private async getFromCache(restaurantId: string): Promise<Dish[]> {
    const cachedDishes = await this.redis.get(
      GET_RESTAURANT_DISHES_CACHE_KEY(restaurantId),
    );

    return cachedDishes ? JSON.parse(cachedDishes) : [];
  }

  public async listAll(restaurantId: string): Promise<ListDishesDtoOutput> {
    const cachedDishes = await this.getFromCache(restaurantId);

    if (!cachedDishes.length) {
      await this.insertIntoCache(restaurantId, cachedDishes);
      return this.dishesRepository.listAll(restaurantId);
    }

    return cachedDishes;
  }
}
