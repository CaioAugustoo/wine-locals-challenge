import { cn } from "../lib";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "w-fit rounded-md px-4 py-2 text-sm font-semibold text-black shadow-sm duration-100 hover:bg-yellow-500",
        disabled ? "cursor-not-allowed bg-yellow-600" : "bg-yellow-500",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
