import { Button, Input, TextArea } from "@/components";
import { CreateDishSchema, createDishSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputAttributes, NumericFormat } from "react-number-format";

interface NumericFormatProps extends InputAttributes {
  value: string;
}

export const Form = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Omit<CreateDishSchema, "restaurantId">>({
    resolver: zodResolver(createDishSchema),
  });

  const onSubmit: SubmitHandler<Omit<CreateDishSchema, "restaurantId">> = (
    data
  ) => console.log(data);

  return (
    <form
      className="my-4 flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Exemplo: X-Tudo"
        label="Nome do prato"
        error={errors.name?.message}
        {...register("name")}
      />

      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={(props: NumericFormatProps) => {
          setValue("price", props.value);

          return (
            <Input
              placeholder="R$ 120,00"
              label="Valor"
              className="w-[200px]"
              error={errors?.price?.message}
              {...register("price")}
              {...props}
            />
          );
        }}
      />

      <div>
        <TextArea
          {...register("description")}
          label="Descrição do prato"
          placeholder="Insira uma descrição"
          rows={5}
          error={errors.description?.message}
        />
        <span className="text-xs">
          *A descrição deve conter até 200 caracteres
        </span>
      </div>

      <Button type="submit" className="mt-5 w-full">
        Salvar
      </Button>
    </form>
  );
};
