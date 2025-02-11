"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/common";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-100 dark:data-[state=on]:bg-dark data-[state=on]:text-main dark:data-[state=on]:text-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-main dark:text-white",
  {
    variants: {
      variant: {
        default:
          "bg-gray-200 shadow-sm hover:bg-gray-200/90 dark:bg-dark dark:hover:bg-dark/90",
        destructive:
          "bg-danger text-white shadow-xs hover:bg-danger/90 border-0",
        outline:
          "border border-gray-200 bg-white shadow-xs hover:opacity-80 dark:border-dark dark:bg-full-dark",
        secondary:
          "bg-gray-100 shadow-xs hover:bg-gray-100/80 dark:bg-dark/50 dark:hover:bg-dark/30 border-0",
        ghost: "hover:bg-gray-100 dark:hover:bg-dark shadow-none",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
