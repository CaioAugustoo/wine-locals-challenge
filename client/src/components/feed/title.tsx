interface FeedTitleProps {
  totalCount: number;
}

export const Title = ({ totalCount = 0 }: FeedTitleProps) => {
  return (
    <>
      <h1 className="text-left text-4xl font-bold text-yellow-500 ">Lugares</h1>
      <p className="font-light">{totalCount} lugares cadastrados</p>
    </>
  );
};
