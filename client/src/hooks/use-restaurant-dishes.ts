import { useListAllRestaurantDishesQuery } from "./queries";

export const useListAllDishes = (restaurantId: string) => {
  const { data, isLoading, error, ...rest } =
    useListAllRestaurantDishesQuery(restaurantId);

  const dishes = data ? data.pages.flatMap((page) => page?.dishes || []) : [];

  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    data,
    isLoading,
    error,
    dishes,
    totalCount,
    ...rest,
  };
};
