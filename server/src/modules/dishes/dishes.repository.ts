import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma';
import { ListDishesDtoOutput } from '../dishes/dto/list-restaurants-dishes.dto';
import { IDishesRepository } from './interfaces/dishes.repository';

@Injectable()
export class DishesRepository implements IDishesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async listAll(restaurantId: string): Promise<ListDishesDtoOutput> {
    return this.prismaService.dish.findMany({
      where: {
        restaurantId,
      },
    });
  }
}
