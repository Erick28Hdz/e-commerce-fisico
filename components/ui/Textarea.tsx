import { TextareaHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-[var(--color-principal)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            "w-full rounded-xl border border-[var(--color-accent)] p-3 text-sm bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-principal)] transition-shadow resize-none",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-600 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
