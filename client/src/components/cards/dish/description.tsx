import { Dish } from "@/types";

interface DescriptionProps {
  description: Dish["description"];
}

export const Description = ({ description }: DescriptionProps) => {
  return <p className="break-words">{description}</p>;
};
