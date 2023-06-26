import { mainAdapter } from "@/infra";
import { queryClient } from "@/lib";
import { CreateDishSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";

const handler = async (data: CreateDishSchema) => {
  const response = await mainAdapter.post(
    `/restaurants/${data.restaurantId}/dishes`,
    data
  );

  return response.data.data;
};

export const useCreateRestaurantDishMutation = (data: CreateDishSchema) => {
  return useMutation(
    ["create-restaurant-dish"],
    async (data: CreateDishSchema) => {
      return handler(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "restaurants",
          "restaurant",
          data.restaurantId,
          "dishes",
        ]);
      },
    }
  );
};
