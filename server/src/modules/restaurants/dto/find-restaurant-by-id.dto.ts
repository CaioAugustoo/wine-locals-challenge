import { Restaurant } from '@prisma/client';

export type FindRestaurantByIdOutput = Omit<Restaurant, 'createdAt'> | null;
export type FindRestaurantWithTotalDishesOutput = {
  totalDishes: number;
} & FindRestaurantByIdOutput;
