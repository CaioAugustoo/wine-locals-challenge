import { Module } from '@nestjs/common';

import { PrismaService } from '../../config/prisma';
import { DishesRepository } from '../dishes/dishes.repository';
import { DishesService } from '../dishes/dishes.service';
import { RedisDishesRepository } from '../dishes/redis.repository';
import { RedisRestaurantRepository } from './redis.repository';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  controllers: [RestaurantsController],
  providers: [
    DishesService,
    RestaurantsService,
    PrismaService,
    RestaurantsRepository,
    DishesRepository,
    RedisDishesRepository,
    RedisRestaurantRepository,
  ],
})
export class RestaurantsModule {}
