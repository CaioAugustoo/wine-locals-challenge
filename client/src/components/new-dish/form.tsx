import { Button, Input, TextArea } from "@/components";
import { useCreateRestaurantDishMutation } from "@/hooks";
import { CreateDishSchema, createDishSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputAttributes, NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface NumericFormatProps extends InputAttributes {
  value: string;
}

export const Form = () => {
  const { push } = useRouter();
  const { id } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateDishSchema>({
    resolver: zodResolver(createDishSchema),
    defaultValues: {
      restaurantId: id,
    },
  });

  const { mutateAsync, isLoading } = useCreateRestaurantDishMutation(
    getValues()
  );

  const onSubmit: SubmitHandler<CreateDishSchema> = async (data) => {
    try {
      const cleanPrice = data.price
        .toString()
        .replace("R$ ", "")
        .replace(".", "");

      console.log(cleanPrice);

      const parsedValues = {
        ...data,
        price: Number(cleanPrice),
      };

      await mutateAsync(parsedValues);

      toast.success("Prato criado com sucesso");
      push(`/restaurant/${id}`);
    } catch (err) {
      toast.error("Ocorreu um erro ao criar o prato");
    }
  };

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

      <Button type="submit" className="mt-5 w-full" disabled={isLoading}>
        {isLoading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
};
