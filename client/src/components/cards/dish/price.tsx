import { Dish } from "@/src/types";
import { formatCurrency } from "@/src/utils";

interface PriceProps {
  price: Dish["price"];
}

export const Price = ({ price }: PriceProps) => {
  return <span className="font-bold">{formatCurrency(price)}</span>;
};
