import { mainAdapter } from "@/infra";
import { FeedRestaurant } from "@/types";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface Response {
  restaurants: FeedRestaurant[];
  totalCount: number;
}

const handler = async (page: number = 1): Promise<Response> => {
  const response = await mainAdapter.get(`/restaurants?page=${page}`);

  return response.data.data;
};

export const useListAllRestaurantsQuery = () => {
  const cachedData: InfiniteData<Response> | undefined =
    useQueryClient().getQueryData(["restaurants"]);

  const { data, ...rest } = useInfiniteQuery(
    ["restaurants"],
    async ({ pageParam }) => {
      return handler(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if ((lastPage?.restaurants.length || 0) < 10) {
          return;
        }

        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );

  return { data: data || cachedData, ...rest };
};
