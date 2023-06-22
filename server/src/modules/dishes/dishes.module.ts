import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { RedisRestaurantRepository } from '../restaurants/redis.repository';
import { RestaurantsRepository } from '../restaurants/restaurants.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { DishesRepository } from './dishes.repository';
import { DishesService } from './dishes.service';
import { RedisDishesRepository } from './redis.repository';

@Module({
  controllers: [],
  providers: [
    DishesService,
    RestaurantsService,
    PrismaService,
    DishesRepository,
    RedisRestaurantRepository,
    RedisDishesRepository,
    RestaurantsRepository,
  ],
})
export class DishesModule {}
