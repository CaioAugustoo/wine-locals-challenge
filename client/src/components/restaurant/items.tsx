import { Dish } from "@/types";
import { DishCard } from "../cards/dish/dish";

interface ItemsProps {
  dishes: Dish[];
}

export const Items = ({ dishes }: ItemsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {dishes?.length > 0 &&
        dishes.map((dish) => <DishCard key={dish.id} {...dish} />)}
    </div>
  );
};
