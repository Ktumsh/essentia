import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "../ui/icons/status";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground leading-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [&_svg:not([class*='text-'])]:text-destructive",
        outline:
          "border border-border bg-transparent hover:opacity-80 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mobile:
          "justify-start gap-5 h-12! active:bg-slate-200 dark:active:bg-alternative rounded-none! [&_svg]:size-5 [&_svg]:stroke-[2.5] text-foreground w-full! px-6!",
        "mobile-danger":
          "justify-center gap-5 h-12! bg-primary! rounded-none! [&_svg]:size-4 [&_svg]:stroke-[2.5] text-white! w-full! rounded-xl!",
        gradient:
          "bg-gradient-to-r dark:from-[-100%] from-gradient-from via-gradient-via to-gradient-to active:scale-[.97] shadow-none text-white [&_svg]:text-white! hover:opacity-80",
        alternative:
          "[background-image:var(--alternative-gradient)] active:scale-[.97] shadow-none text-white text-base hover:saturate-150 dark:text-primary-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-xl px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-full",
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

function Button({
  className,
  variant,
  radius,
  size,
  fullWidth = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
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
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setIsVisible(!isVisible)}
      className="text-muted-foreground absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent! dark:hover:bg-transparent!"
    >
      {isVisible ? (
        <EyeOffIcon className="size-5" />
      ) : (
        <EyeIcon className="size-5" />
      )}
      <span className="sr-only">
        {isVisible ? "Hide password" : "Show password"}
      </span>
    </Button>
  );
}

export { Button, ButtonPassword, buttonVariants };
