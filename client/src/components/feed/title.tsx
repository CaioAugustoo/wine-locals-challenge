import { Button, Heading } from "@/components";
import Link from "next/link";

interface FeedTitleProps {
  totalCount: number;
}

export const Title = ({ totalCount = 0 }: FeedTitleProps) => {
  const getHeadingDescription = () => {
    if (totalCount === 0) {
      return "Nenhum lugar cadastrado";
    }

    if (totalCount === 1) {
      return "1 lugar cadastrado";
    }

    return `${totalCount} lugares cadastrados`;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading title="Lugares" description={getHeadingDescription()} />
      </div>

      <Button className="text-xs md:text-sm">
        <Link href="/create-restaurant">Criar novo</Link>
      </Button>
    </div>
  );
};
