import z from "zod";

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
    price: z
      .number({
        required_error: "Campo obrigatório.",
      })
      .min(0, {
        message: "Valor mínimo de R$ 0,00.",
      }),

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

export type CreateDish = z.infer<typeof createDishSchema>;
