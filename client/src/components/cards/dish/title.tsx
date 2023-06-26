import { Dish } from "@/types";

interface TitleProps {
  name: Dish["name"];
}

export const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="max-w-[250px] truncate font-bold md:max-w-max" title={name}>
      {name}
    </h1>
  );
};
