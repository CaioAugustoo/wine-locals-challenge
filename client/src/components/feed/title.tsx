import { Button, Heading } from "@/src/components";
import Link from "next/link";

interface FeedTitleProps {
  totalCount: number;
}

export const Title = ({ totalCount = 0 }: FeedTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading
          title="Lugares"
          description={`${totalCount} ${
            totalCount === 1 ? "lugar" : "lugares"
          } cadastrados`}
        />
      </div>

      <Button className="text-xs md:text-sm">
        <Link href="/create-restaurant">Criar novo</Link>
      </Button>
    </div>
  );
};
