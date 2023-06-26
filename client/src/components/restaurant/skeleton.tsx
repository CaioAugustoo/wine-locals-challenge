const Title = () => (
  <div className="flex flex-col gap-4">
    <div className="h-10 w-[200px] animate-pulse rounded-sm bg-slate-800" />
    <div className="h-3.5 w-[250px] animate-pulse rounded-sm bg-slate-800" />
  </div>
);

const Cards = () =>
  Array.from({ length: 10 }).map((_, i) => (
    <div
      className="h-24 w-full animate-pulse rounded-md bg-slate-800"
      key={i}
    />
  ));

export const Skeletons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Title />
      <Cards />
    </div>
  );
};
