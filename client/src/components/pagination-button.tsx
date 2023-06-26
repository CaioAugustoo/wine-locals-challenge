import { Button } from "@/src/components";
import { cn } from "@/src/lib";

interface PaginationButtonProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loadingText?: string;
  noMoreText?: string;
  fetchNextPage: () => void;
}

export const PaginationButton = ({
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage,
  loadingText = "Carregando...",
  noMoreText = "Nenhum item para listar",
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
          ? loadingText
          : hasNextPage
          ? "Carregar mais"
          : noMoreText}
      </Button>
    </>
  );
};
