import { mainAdapter } from "@/src/infra";
import { Restaurant } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

interface Response {
  totalDishes: number;
  id: Restaurant["id"];
  name: Restaurant["name"];
}

const handler = async (id: string): Promise<Response> => {
  const response = await mainAdapter.get(`/restaurants/${id}`);

  return response.data.data;
};

export const useFindRestaurantByIdQuery = (id: string) => {
  return useQuery(["restaurant", id], () => handler(id));
};
