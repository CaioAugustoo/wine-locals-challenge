import { cn } from "@/src/lib";
import { Button } from "../button";

interface PaginationButtonProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const PaginationButton = ({
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage,
}: PaginationButtonProps) => {
  const isDisabled = !hasNextPage || isFetchingNextPage;

  return (
    <>
      <Button
        className={cn(
          "mx-auto my-2 rounded-full",
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        )}
        onClick={() => {
          if (!isDisabled) {
            fetchNextPage();
          }
        }}
        disabled={isDisabled}
      >
        {isFetchingNextPage
          ? "Carregando..."
          : hasNextPage
          ? "Carregar mais"
          : "Nenhum restaurante a mais"}
      </Button>
    </>
  );
};
