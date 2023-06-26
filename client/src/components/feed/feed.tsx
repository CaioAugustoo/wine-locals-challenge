import { useFeedRestaurants } from "@/src/hooks";
import { PaginationButton } from "../pagination-button";
import { Error } from "./error";
import { Items } from "./items";
import { Skeletons } from "./skeletons";
import { Title } from "./title";

export const Feed = () => {
  const {
    restaurants,
    error,
    totalCount,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFeedRestaurants();

  return (
    <div className="container mx-auto flex flex-col justify-center gap-4">
      {isLoading && <Skeletons />}

      {!!error && <Error />}

      {!isLoading && !error && (
        <>
          <Title totalCount={totalCount} />
          <Items restaurants={restaurants} />

          <PaginationButton
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </div>
  );
};
