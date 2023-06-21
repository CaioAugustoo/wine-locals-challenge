import { Dish, Restaurant } from '@prisma/client';

interface RestaurantDish {
  id: Dish['id'];
  createdAt: Dish['createdAt'];
  description: Dish['description'];
  name: Dish['name'];
  price: Dish['price'];
}

export type FindRestaurantByNameDtoOutput = Promise<{
  id: Restaurant['id'];
  name: Restaurant['name'];
  Dish: RestaurantDish[];
}>;
