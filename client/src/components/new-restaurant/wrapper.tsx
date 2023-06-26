import { Heading } from "../heading";
import { Form } from "./form";

export const NewRestaurant = () => {
  return (
    <>
      <Heading
        title="Novo restaurante"
        description="Crie seu restaurante e compartilhe com o mundo!"
      />
      <Form />
    </>
  );
};
