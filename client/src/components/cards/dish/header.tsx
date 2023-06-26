import { Dish } from "@/src/types";
import { Price } from "./price";
import { Title } from "./title";

interface HeaderProps {
  name: Dish["name"];
  price: Dish["price"];
}

export const Header = ({ name, price }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Title name={name} />
      <Price price={price} />
    </div>
  );
};
