import { z } from "zod";

export const createDishSchema = z
  .object({
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
    price: z.union([
      z.string({
        required_error: "Campo obrigatório.",
      }),
      z.number({
        required_error: "Campo obrigatório.",
      }),
    ]),
    description: z
      .string({
        required_error: "Campo obrigatório.",
      })
      .min(3, {
        message: "Mínimo de 3 caracteres.",
      })
      .max(200, {
        message: "Máximo de 200 caracteres.",
      }),
    restaurantId: z.string({
      required_error: "Campo obrigatório.",
    }),
  })
  .strict();

export type CreateDishSchema = z.infer<typeof createDishSchema>;
