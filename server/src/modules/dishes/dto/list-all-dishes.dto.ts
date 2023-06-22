import { Dish } from '@prisma/client';

export type ListDishesDto = {
  page?: number;
  restaurantId: string;
};

export type ListDishesDtoOutput = Dish[];

export type PaginatedDishesDtoOutput = {
  dishes: Dish[];
  totalCount: number;
};
