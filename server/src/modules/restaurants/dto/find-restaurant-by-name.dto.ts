import { Restaurant } from '@prisma/client';

export type FindRestaurantByNameDtoOutput = {
  id: Restaurant['id'];
  name: Restaurant['name'];
};
