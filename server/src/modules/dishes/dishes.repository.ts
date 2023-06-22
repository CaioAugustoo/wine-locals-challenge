import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma';
import { getPagination } from '../../shared/utils/get-pagination';
import { CreateDishDto, CreateDishDtoOutput } from './dto/create-dish.dto';
import { ListDishesDto, ListDishesDtoOutput } from './dto/list-all-dishes.dto';
import { IDishesRepository } from './interfaces/dishes.repository';

@Injectable()
export class DishesRepository implements IDishesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateDishDto): Promise<CreateDishDtoOutput> {
    return this.prismaService.dish.create({
      data: {
        createdAt: new Date(),
        restaurantId: dto.restaurantId,
        name: dto.name,
        price: dto.price,
        description: dto.description,
      },
    });
  }

  public async countTotal(restaurantId: string): Promise<number> {
    return this.prismaService.dish.count({
      where: {
        restaurantId,
      },
    });
  }

  public async listAll(dto: ListDishesDto): Promise<ListDishesDtoOutput> {
    const { restaurantId, page } = dto;

    return this.prismaService.dish.findMany({
      where: {
        restaurantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...getPagination(page),
    });
  }
}
