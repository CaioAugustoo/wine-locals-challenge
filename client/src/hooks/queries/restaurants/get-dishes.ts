import { PAGINATION_LIMIT } from "@/constants";
import { mainAdapter } from "@/infra";
import { Dish } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Response {
  dishes: Dish[];
  totalCount: number;
}

const handler = async (id: string, page: number = 1): Promise<Response> => {
  const response = await mainAdapter.get(
    `/restaurants/${id}/dishes?page=${page}`
  );

  return response.data.data;
};

export const useListAllRestaurantDishesQuery = (restaurantId: string) => {
  return useInfiniteQuery(
    ["restaurant", restaurantId, "dishes"],
    async ({ pageParam }) => {
      return handler(restaurantId, pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if ((lastPage?.dishes.length || 0) < PAGINATION_LIMIT) {
          return;
        }

        const nextPage = allPages.length + 1;
        return nextPage;
      },
      enabled: !!restaurantId,
    }
  );
};
