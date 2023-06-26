import React from "react";
import { cn } from "../lib";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name, error, className, ...props }: TextAreaProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
        <textarea
          ref={ref}
          className={cn("rounded-md px-2 py-1.5 text-black", className)}
          id={name}
          name={name}
          {...props}
        />
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
