import { Module } from '@nestjs/common';
import { RedisService } from 'src/config/redis';
import { PrismaService } from '../../config/prisma';
import { RedisRestaurantRepository } from './redis.repository';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    RedisService,
    PrismaService,
    RestaurantsRepository,
    RedisRestaurantRepository,
  ],
})
export class RestaurantsModule {}
