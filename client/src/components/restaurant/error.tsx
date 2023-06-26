import { Empty } from "../empty";

interface ErrorProps {
  description?: string;
}

export const Error = ({
  description = "Tente novamente mais tarde",
}: ErrorProps) => {
  return (
    <Empty title="Erro ao carregar o restaurante" description={description} />
  );
};
