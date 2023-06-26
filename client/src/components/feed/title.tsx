import { Heading } from "@/src/components";

interface FeedTitleProps {
  totalCount: number;
}

export const Title = ({ totalCount = 0 }: FeedTitleProps) => {
  return (
    <Heading
      title="Lugares"
      description={`${totalCount} lugares cadastrados`}
    />
  );
};
