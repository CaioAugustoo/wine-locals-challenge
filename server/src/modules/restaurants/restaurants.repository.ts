import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma';
import { getPagination } from '../../shared/utils/get-pagination';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { FindRestaurantByIdOutput } from './dto/find-restaurant-by-id.dto';
import { FindRestaurantByNameDtoOutput } from './dto/find-restaurant-by-name.dto';
import {
  ListAllRestaurantsByIdDto,
  ListAllRestaurantsByIdDtoOutput,
} from './dto/list-all-restaurants-by-id.dto';
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

  public async findById(id: string): Promise<FindRestaurantByIdOutput> {
    if (!id) {
      return null;
    }

    return this.prismaService.restaurant.findUnique({
      where: {
        id,
      },
      select: {
        createdAt: true,
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

  public async countTotal(): Promise<number> {
    return this.prismaService.restaurant.count();
  }

  public async listAll(
    dto: ListAllRestaurantsByIdDto,
  ): Promise<ListAllRestaurantsByIdDtoOutput> {
    return this.prismaService.restaurant.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            dish: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...getPagination(dto.page),
    });
  }
}
