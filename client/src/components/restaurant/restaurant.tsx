import { useFindRestaurantByIdQuery, useListAllDishes } from "@/src/hooks";
import { useParams } from "next/navigation";
import { PaginationButton } from "../pagination-button";
import { CreateNewDishButton } from "./create-new-dish";
import { Error } from "./error";
import { Items } from "./items";
import { Skeletons } from "./skeleton";
import { Title } from "./title";

export const Restaurant = () => {
  const params = useParams();

  const {
    data,
    error: restaurantError,
    isLoading: isLoadingRestaurant,
  } = useFindRestaurantByIdQuery(params.id);

  const {
    dishes,
    error: dishesError,
    isLoading: isLoadingDishes,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useListAllDishes(params.id);

  const error = restaurantError || dishesError;
  const isLoading = isLoadingRestaurant || isLoadingDishes;

  if (!data && !isLoading) {
    return <Error description="Parece que esse restaurante não existe." />;
  }

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <Skeletons />}

      {!!error && <Error />}

      {!isLoading && !error && (
        <>
          <Title name={data?.name} totalDishes={data?.totalDishes} />
          <Items dishes={dishes} />

          <PaginationButton
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
          <CreateNewDishButton />
        </>
      )}
    </div>
  );
};
