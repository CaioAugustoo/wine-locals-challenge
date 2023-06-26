import { Heading } from "@/src/components";

interface TitleProps {
  name: string | undefined;
  totalDishes: number | undefined;
}

export const Title = ({ name = "", totalDishes = 0 }: TitleProps) => {
  return (
    <div>
      <Heading title={name} description={`${totalDishes} pratos`} />
    </div>
  );
};
