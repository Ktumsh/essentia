import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/common";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-transform-colors-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-blue-600 text-main dark:text-white will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-gray-200 shadow hover:bg-gray-200/90 dark:bg-dark dark:hover:bg-dark/90",
        destructive:
          "bg-danger text-white shadow-sm hover:bg-danger/90 border-0",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:opacity-80 dark:border-dark dark:bg-full-dark",
        secondary:
          "bg-gray-100 shadow-sm hover:bg-gray-100/80 dark:bg-dark/50 dark:hover:bg-dark/30 border-0",
        ghost: "hover:bg-gray-100 dark:hover:bg-dark shadow-none",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
        alternative:
          "bg-light-gradient dark:bg-dark-gradient-v2 active:scale-[.97] shadow-none text-white text-base hover:opacity-80",
      },
      radius: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "size-9",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      radius,
      size,
      fullWidth = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type="button"
        className={cn(
          buttonVariants({ variant, radius, size, fullWidth, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
