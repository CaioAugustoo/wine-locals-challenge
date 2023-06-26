import { Empty } from "@/components";

export const Error = () => {
  return (
    <Empty
      className="h-80"
      title="Ops! Algo deu errado."
      description="Tente novamente mais tarde."
    />
  );
};
