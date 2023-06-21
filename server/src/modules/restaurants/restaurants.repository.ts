import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { FindRestaurantByNameDtoOutput } from './dto/find-restaurant-by-name.dto';
import { IRestaurantsRepository } from './interfaces/restaurants.repository';

@Injectable()
export class RestaurantsRepository implements IRestaurantsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateRestaurantDto): CreateRestaurantDtoOutput {
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

  public async findByName(name: string): FindRestaurantByNameDtoOutput {
    return this.prismaService.restaurant.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        Dish: {
          select: {
            id: true,
            createdAt: true,
            description: true,
            name: true,
            price: true,
          },
        },
      },
    });
  }
}
