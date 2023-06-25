import { Restaurant } from "@/src/types";

interface TitleProps {
  name: Restaurant["name"];
}

export const Title = ({ name }: TitleProps) => {
  return (
    <h1 className="max-w-[250px] truncate font-bold md:max-w-max" title={name}>
      {name}
    </h1>
  );
};
