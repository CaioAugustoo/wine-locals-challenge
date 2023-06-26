import { Heading } from "@/components";

interface TitleProps {
  name: string | undefined;
  totalDishes: number | undefined;
}

export const Title = ({ name = "", totalDishes = 0 }: TitleProps) => {
  return <Heading title={name} description={`${totalDishes} pratos`} />;
};
