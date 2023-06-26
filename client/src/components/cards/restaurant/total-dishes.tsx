import { FeedRestaurant } from "@/src/types";

interface TotalDishesProps {
  total: FeedRestaurant["_count"]["dish"];
}

export const TotalDishes = ({ total }: TotalDishesProps) => {
  return (
    <span className="font-light">
      {total} {total === 1 ? "Prato" : "Pratos"}
    </span>
  );
};
