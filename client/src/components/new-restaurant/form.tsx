import { Button, Input } from "@/components";
import { useCreateRestaurantMutation } from "@/hooks";
import { CreateRestaurantSchema, createRestaurantSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Form = () => {
  const { push } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateRestaurantSchema>({
    resolver: zodResolver(createRestaurantSchema),
  });

  const { mutateAsync, isLoading } = useCreateRestaurantMutation();

  const onSubmit: SubmitHandler<CreateRestaurantSchema> = async (data) => {
    try {
      await mutateAsync(data);

      toast.success("Restaurante criado com sucesso");
      push(`/`);
    } catch (err) {
      toast.error("Ocorreu um erro ao criar o restaurante");
    }
  };

  return (
    <form
      className="my-4 flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Exemplo: Meu restaurante maravilhoso"
        label="Nome do restaurante"
        error={errors.name?.message}
        {...register("name")}
      />

      <Button type="submit" className="mt-5 w-full" disabled={isLoading}>
        {isLoading ? "Criando..." : "Criar"}
      </Button>
    </form>
  );
};
