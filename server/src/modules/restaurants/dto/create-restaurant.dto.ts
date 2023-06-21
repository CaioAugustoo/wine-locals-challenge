import { Restaurant } from '@prisma/client';
import { z } from 'zod';

export const createRestaurantDtoSchema = z.object({
  name: z
    .string({
      required_error: "The 'name' field is required.",
    })
    .min(3)
    .max(255),
});

export type CreateRestaurantDto = z.infer<typeof createRestaurantDtoSchema>;

export type CreateRestaurantDtoOutput = Promise<{
  id: Restaurant['id'];
  name: Restaurant['name'];
}>;
