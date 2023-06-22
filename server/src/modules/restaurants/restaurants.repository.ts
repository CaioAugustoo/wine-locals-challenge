import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { FindRestaurantByNameDtoOutput } from './dto/find-restaurant-by-name.dto';
import { IRestaurantsRepository } from './interfaces/restaurants.repository';

@Injectable()
export class RestaurantsRepository implements IRestaurantsRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(
    dto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDtoOutput> {
    return this.prismaService.restaurant.create({
      data: {
        name: dto.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  public async findByName(
    name: string,
  ): Promise<FindRestaurantByNameDtoOutput> {
    return this.prismaService.restaurant.findUnique({
      where: {
        name,
      },
    });
  }
}
