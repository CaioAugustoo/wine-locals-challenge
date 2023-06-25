import { FeedRestaurant } from "@/src/types";
import { Title } from "./title";
import { TotalDishes } from "./total-dishes";
import { Wrapper } from "./wrapper";

type RestaurantCardProps = FeedRestaurant;

export const RestaurantCard = (data: RestaurantCardProps) => {
  const { id, name, _count: countTotal } = data;

  return (
    <Wrapper restaurantId={id} restaurantName={name}>
      <Title name={name} />
      <TotalDishes total={countTotal.dish} />
    </Wrapper>
  );
};
