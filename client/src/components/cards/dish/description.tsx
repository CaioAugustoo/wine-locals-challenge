import { Dish } from "@/src/types";

interface DescriptionProps {
  description: Dish["description"];
}

export const Description = ({ description }: DescriptionProps) => {
  return <p className="break-words">{description}</p>;
};
