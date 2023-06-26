import { cn } from "../lib";

interface EmptyProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export const Empty = ({
  title,
  description,
  children,
  className,
}: EmptyProps) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center text-center",
        className
      )}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-xl font-light">{description}</p>
      {children}
    </div>
  );
};
