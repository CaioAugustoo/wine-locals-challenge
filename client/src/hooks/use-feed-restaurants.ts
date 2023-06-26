import { useListAllRestaurantsQuery } from "./queries";

export const useFeedRestaurants = () => {
  const { data, isLoading, error, ...rest } = useListAllRestaurantsQuery();

  const restaurants = data
    ? data.pages.flatMap((page) => page?.restaurants || [])
    : [];

  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    data,
    isLoading,
    error,
    restaurants,
    totalCount,
    ...rest,
  };
};
