import { Restaurant } from '@prisma/client';
import { z } from 'zod';

export const listAllRestaurantsByIdDtoSchema = z.object({
  page: z.number().int().positive().default(1),
});

export type ListAllRestaurantsByIdDto = z.infer<
  typeof listAllRestaurantsByIdDtoSchema
>;

export type ListedRestaurant = {
  _count: {
    dish: number;
  };
} & Pick<Restaurant, 'id' | 'name'>;

export type ListAllRestaurantsByIdDtoOutput = ListedRestaurant[];

export type ListAllPaginatedRestaurantsByIdDtoOutput = {
  restaurants: ListedRestaurant[];
  totalCount: number;
};
