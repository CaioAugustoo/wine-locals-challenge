import {
  useFindRestaurantByIdQuery,
  useGetRestaurantsDishesQuery,
} from "@/src/hooks";
import { useParams } from "next/navigation";
import { CreateNewDishButton } from "./create-new-dish";
import { Error } from "./error";
import { Items } from "./items";
import { Title } from "./title";

export const Restaurant = () => {
  const params = useParams();

  const {
    data,
    error: restaurantError,
    isLoading: isLoadingRestaurant,
  } = useFindRestaurantByIdQuery(params.id);

  const {
    data: dishesData,
    error: dishesError,
    isLoading: isLoadingDishes,
  } = useGetRestaurantsDishesQuery(params.id);

  const error = restaurantError || dishesError;
  const isLoading = isLoadingRestaurant || isLoadingDishes;

  if (!data && !isLoading) {
    return <Error description="Parece que esse restaurante não existe." />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Title name={data?.name} totalDishes={data?.totalDishes} />
      {!!error && <Error />}

      <Items dishes={dishesData?.dishes ?? []} />

      <CreateNewDishButton />
    </div>
  );
};
