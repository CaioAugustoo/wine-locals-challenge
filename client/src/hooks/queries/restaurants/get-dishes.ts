import { mainAdapter } from "@/src/infra";
import { Dish } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

interface Response {
  dishes: Dish[];
  totalCount: number;
}

const handler = async (id: string): Promise<Response> => {
  const response = await mainAdapter.get(`/restaurants/${id}/dishes`);

  return response.data.data;
};

export const useGetRestaurantsDishesQuery = (restaurantId: string) => {
  return useQuery(
    ["restaurant", restaurantId, "dishes"],
    () => handler(restaurantId),
    {
      enabled: !!restaurantId,
    }
  );
};
