import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository, PrismaService],
})
export class RestaurantsModule {}
