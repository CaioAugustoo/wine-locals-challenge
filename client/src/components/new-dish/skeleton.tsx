const Title = () => (
  <div className="flex flex-col gap-4">
    <div className="h-10 w-[200px] animate-pulse rounded-sm bg-slate-800" />
  </div>
);

export const Skeletons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Title />
    </div>
  );
};
