import { randomUUID } from 'crypto';

export const createDishesMock = (size: number) => {
  return Array.from({ length: size }).map((_, index) => ({
    id: randomUUID(),
    name: `Dish ${index + 1}`,
    price: 10,
    createdAt: new Date(),
    description: `Dish ${index + 1} description`,
    restaurantId: randomUUID(),
  }));
};
