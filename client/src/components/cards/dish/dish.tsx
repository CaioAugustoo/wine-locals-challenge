import { Dish } from "@/types";
import { Description } from "./description";
import { Header } from "./header";
import { Wrapper } from "./wrapper";

interface DishCardProps extends Dish {}

export const DishCard = ({ id, name, description, price }: DishCardProps) => {
  return (
    <Wrapper>
      <Header name={name} price={price} />
      <Description description={description} />
    </Wrapper>
  );
};
