import { useFindRestaurantByIdQuery } from "@/hooks";
import { useParams } from "next/navigation";
import { Empty } from "../empty";
import { Heading } from "../heading";
import { Form } from "./form";

export const NewDish = () => {
  const params = useParams();
  const { data, error, isLoading } = useFindRestaurantByIdQuery(params.id);

  if ((!data && !isLoading) || !!error) {
    return (
      <Empty
        title="Ops! Algo deu errado"
        description="Por favor, tente novamente mais tarde"
      />
    );
  }

  return (
    <>
      <Heading title={data?.name!} />
      <Form />
    </>
  );
};
