import { Dish } from '@prisma/client';
import { z } from 'zod';

export const createDishDtoSchema = z
  .object({
    name: z
      .string({
        required_error: "The 'name' field is required.",
      })
      .min(3)
      .max(50),
    price: z.number({
      required_error: "The 'price' field is required.",
    }),
    description: z
      .string({
        required_error: "The 'description' field is required.",
      })
      .min(3)
      .max(255),
    restaurantId: z.string({
      required_error: "The 'restaurantId' field is required.",
    }),
  })
  .strict();

export type CreateDishDto = z.infer<typeof createDishDtoSchema>;
export type CreateDishDtoOutput = {
  id: Dish['id'];
} & Omit<Dish, 'restaurantId'>;
