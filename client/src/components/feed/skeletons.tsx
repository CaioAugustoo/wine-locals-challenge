const Title = () => (
  <div className="flex flex-col gap-4">
    <div className="h-10 w-[200px] animate-pulse rounded-sm bg-slate-800" />
    <div className="h-3.5 w-[250px] animate-pulse rounded-sm bg-slate-800" />
  </div>
);

const Button = () => (
  <div className="h-10 w-12 animate-pulse rounded-full bg-slate-800 md:h-12" />
);

const Cards = () =>
  Array.from({ length: 10 }).map((_, i) => (
    <div className="flex items-center gap-4" key={i}>
      <div className="h-20 w-full animate-pulse rounded-md bg-slate-800" />
      <Button />
    </div>
  ));

export const Skeletons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Title />
      <Cards />
    </div>
  );
};
