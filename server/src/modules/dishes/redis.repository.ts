import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Dish } from '@prisma/client';
import {
  GET_RESTAURANT_DISHES_CACHE_KEY,
  GET_TOTAL_DISHES_CACHE_KEY,
} from '../../shared/constants/cache';
import { DishesRepository } from './dishes.repository';
import { CreateDishDto, CreateDishDtoOutput } from './dto/create-dish.dto';
import { ListDishesDto, ListDishesDtoOutput } from './dto/list-all-dishes.dto';
import { IDishesRepository } from './interfaces/dishes.repository';

@Injectable()
export class RedisDishesRepository implements IDishesRepository {
  public constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly dishesRepository: DishesRepository,
  ) {}

  public async create(dto: CreateDishDto): Promise<CreateDishDtoOutput> {
    const createdDish = await this.dishesRepository.create(dto);

    const { restaurantId } = dto;

    await Promise.all([
      this.incrementTotalIntoCache(restaurantId),
      this.redis.del(GET_RESTAURANT_DISHES_CACHE_KEY({ restaurantId })),
    ]);

    return createdDish;
  }

  private async insertIntoCache(dto: ListDishesDto, dishes: Dish[]) {
    await this.redis.set(
      GET_RESTAURANT_DISHES_CACHE_KEY(dto),
      JSON.stringify(dishes),
    );
  }

  private async incrementTotalIntoCache(restaurantId: string) {
    const cachedTotal = await this.getTotalFromCache(restaurantId);

    if (cachedTotal) {
      await this.redis.set(
        GET_TOTAL_DISHES_CACHE_KEY(restaurantId),
        JSON.stringify(cachedTotal + 1),
      );
    }
  }

  private async getAllFromCache(dto: ListDishesDto): Promise<Dish[]> {
    const cachedDishes = await this.redis.get(
      GET_RESTAURANT_DISHES_CACHE_KEY(dto),
    );

    return cachedDishes ? JSON.parse(cachedDishes) : [];
  }

  private async setTotalIntoCache(restaurantId: string, total: number) {
    await this.redis.set(
      GET_TOTAL_DISHES_CACHE_KEY(restaurantId),
      JSON.stringify(total),
    );
  }

  private async getTotalFromCache(restaurantId: string): Promise<number> {
    const cachedTotal = await this.redis.get(
      GET_TOTAL_DISHES_CACHE_KEY(restaurantId),
    );

    return cachedTotal ? JSON.parse(cachedTotal) : 0;
  }

  public async countTotal(restaurantId: string): Promise<number> {
    const cachedTotal = await this.getTotalFromCache(restaurantId);

    if (!cachedTotal) {
      const total = await this.dishesRepository.countTotal(restaurantId);

      await this.setTotalIntoCache(restaurantId, total);
      return total;
    }

    return cachedTotal;
  }

  public async listAll(dto: ListDishesDto): Promise<ListDishesDtoOutput> {
    const cachedDishes = await this.getAllFromCache(dto);

    if (!cachedDishes.length) {
      const allDishes = await this.dishesRepository.listAll(dto);
      await this.insertIntoCache(dto, allDishes);

      return allDishes;
    }

    return cachedDishes;
  }
}
