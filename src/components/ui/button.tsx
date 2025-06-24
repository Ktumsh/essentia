import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";

import { EyeIcon, EyeOffIcon } from "../icons/status";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground leading-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-transparent hover:opacity-80 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-foreground hover:bg-accent/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mobile:
          "justify-start gap-5 h-12! active:bg-alternative rounded-none! [&_svg]:size-5 text-foreground w-full! px-6!",
        "mobile-primary":
          "justify-center gap-5 h-12! bg-primary! [&_svg]:size-4 text-primary-foreground w-full! rounded-xl!",
        "mobile-destructive":
          "justify-center gap-5 h-12! bg-destructive! [&_svg]:size-4 text-white w-full! rounded-xl!",
        gradient:
          "bg-premium active:scale-[.97] shadow-none text-white [&_svg]:text-white! hover:saturate-150 duration-300",
        "gradient-plus":
          "bg-premium-plus active:scale-[.97] shadow-none text-white [&_svg]:text-white! hover:saturate-150 duration-300",
        premium:
          "relative border overflow-hidden md:border-fuchsia-300 bg-fuchsia-100 text-white md:text-secondary after:absolute after:inset-0 after:h-full after:w-full md:after:w-0 after:bg-linear-to-r/shorter after:from-fuchsia-500 after:to-fuchsia-600 after:rounded-md after:transition-all after:duration-500 after:ease-in-out after:content-[''] hover:border-transparent! hover:text-white! hover:opacity-100 hover:after:w-full dark:md:border-fuchsia-700 dark:bg-fuchsia-950 **:z-1 duration-500 border-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-full px-3 has-[>svg]:px-2.5 gap-1.5 text-xs",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-8 rounded-full",
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-sm",
        md: "rounded-md",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  radius,
  size,
  fullWidth = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, radius, size, fullWidth, className }),
      )}
      {...props}
    />
  );
}

type ButtonPasswordType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonPassword({ isVisible, setIsVisible }: ButtonPasswordType) {
  return (
    <button
      type="button"
      className="text-muted-foreground absolute top-0 right-0 inline-flex h-full items-center justify-center px-3"
      onClick={() => setIsVisible(!isVisible)}
    >
      {isVisible ? (
        <EyeIcon className="size-5" />
      ) : (
        <EyeOffIcon className="size-5" />
      )}
      <span className="sr-only">
        {isVisible ? "Hide password" : "Show password"}
      </span>
    </button>
  );
}

export { Button, ButtonPassword, buttonVariants };
