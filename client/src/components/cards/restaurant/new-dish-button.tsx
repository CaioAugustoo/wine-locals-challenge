import { Icons } from "@/components";
import { Restaurant } from "@/types";
import { useRouter } from "next/navigation";

interface NewDishButtonProps {
  restaurantId: Restaurant["id"];
}

export const NewDishButton = ({ restaurantId }: NewDishButtonProps) => {
  const { push } = useRouter();

  return (
    <button
      title="Adicionar novo prato"
      className="duration-100 hover:scale-105"
      onClick={() => push(`/restaurant/${restaurantId}/new-dish`)}
    >
      <Icons.plusCircle size={35} />
    </button>
  );
};
