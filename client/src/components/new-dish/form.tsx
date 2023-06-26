import { Button, Input, TextArea } from "@/src/components";
import { CreateDish, createDishSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const Form = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateDish>({
    resolver: zodResolver(createDishSchema),
  });

  const onSubmit: SubmitHandler<CreateDish> = (data) => console.log(data);

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
        customInput={(props) => (
          <Input
            placeholder="R$ 120,00"
            label="Valor"
            className="w-[200px]"
            error={errors?.price?.message}
            {...register("price")}
            {...props}
          />
        )}
      />

      <div>
        <TextArea
          label="Descrição do prato"
          placeholder="Insira uma descrição"
          rows={5}
          error={errors.description?.message}
          {...register("description")}
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
