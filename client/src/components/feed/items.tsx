import { FeedRestaurant } from "@/types";
import { RestaurantCard } from "../cards";

interface ItemsProps {
  restaurants: FeedRestaurant[];
}

export const Items = ({ restaurants }: ItemsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {restaurants?.length > 0 &&
        restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
    </div>
  );
};
