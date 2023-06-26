import { Heading } from "@/src/components";

interface TitleProps {
  name: string;
  totalDishes: number;
}

export const Title = ({ name, totalDishes }: TitleProps) => {
  return <Heading title={name} description={`${totalDishes} pratos`} />;
};
