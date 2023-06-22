import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma';
import { getPagination } from '../../shared/utils/get-pagination';
import { ListDishesDto, ListDishesDtoOutput } from './dto/list-all-dishes.dto';
import { IDishesRepository } from './interfaces/dishes.repository';

@Injectable()
export class DishesRepository implements IDishesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async countTotal(restaurantId: string): Promise<number> {
    return this.prismaService.dish.count({
      where: {
        restaurantId,
      },
    });
  }

  public async listAll(dto: ListDishesDto): Promise<ListDishesDtoOutput> {
    const { restaurantId, limit, page } = dto;

    return this.prismaService.dish.findMany({
      where: {
        restaurantId,
      },
      ...getPagination(page, limit),
    });
  }
}
