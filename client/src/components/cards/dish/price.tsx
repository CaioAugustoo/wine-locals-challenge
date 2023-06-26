import { Dish } from "@/types";
import { formatCurrency } from "@/utils";

interface PriceProps {
  price: Dish["price"];
}

export const Price = ({ price }: PriceProps) => {
  return <span className="font-bold">{formatCurrency(price)}</span>;
};
