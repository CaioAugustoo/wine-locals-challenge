import { Dish, Restaurant } from '@prisma/client';

export type FindRestaurantByIdOutput =
  | ({
      dishes: Dish[];
    } & Omit<Restaurant, 'createdAt'>)
  | null;
