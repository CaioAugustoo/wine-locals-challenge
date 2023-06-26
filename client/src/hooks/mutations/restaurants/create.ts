import { mainAdapter } from "@/infra";
import { queryClient } from "@/lib";
import { CreateRestaurantSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";

const handler = async (data: CreateRestaurantSchema) => {
  const response = await mainAdapter.post("/restaurants", data);
  return response.data.data;
};

export const useCreateRestaurantMutation = () => {
  return useMutation(
    async (data: CreateRestaurantSchema) => {
      return handler(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["restaurants"]);
      },
    }
  );
};
