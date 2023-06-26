import { useFindRestaurantByIdQuery } from "@/src/hooks";
import { useParams } from "next/navigation";
import { Error } from "./error";
import { Title } from "./title";

export const Restaurant = () => {
  const params = useParams();
  const { data, error } = useFindRestaurantByIdQuery(params.id);

  if (!data) {
    return <Error description="Parece que esse restaurante não existe." />;
  }

  return (
    <>
      <Title name={data?.name} totalDishes={data?.totalDishes} />
      {!!error && <Error />}
    </>
  );
};
