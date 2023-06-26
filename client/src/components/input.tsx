import { cn } from "@/lib";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, className, ...props }: InputProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          ref={ref}
          className={cn("rounded-md px-2 py-1.5 text-black", className)}
          id={name}
          {...props}
        />
        {!!error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
