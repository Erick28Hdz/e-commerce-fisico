import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  {
    variants: {
      variant: {
        default:
          "border-1 border-[var(--color-principal)] bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-[var(--color-principal)] hover:text-[var(--color-text-secondary)]",

        destructive:
          "bg-red-600 text-white hover:bg-red-700 border border-red-700",

        outline:
          "border border-[var(--color-principal)] bg-transparent text-[var(--color-principal)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",

        secondary:
          "border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-principal)] hover:text-[var(--color-text-secondary)]",

        ghost:
          "bg-transparent text-[var(--color-principal)]  hover:text-[var(--color-text-primary)] border border-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "w-9 h-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
