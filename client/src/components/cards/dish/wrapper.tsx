interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border-l-[6px] border-yellow-500 bg-slate-800 p-4 shadow-md">
      {children}
    </div>
  );
};
