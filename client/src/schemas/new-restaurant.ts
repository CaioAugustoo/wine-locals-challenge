import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .min(3, {
      message: "Mínimo de 3 caracteres.",
    })
    .max(50, {
      message: "Máximo de 50 caracteres.",
    }),
});

export type CreateRestaurantSchema = z.infer<typeof createRestaurantSchema>;
