import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Info,
} from "lucide-react";

const badgeAlertVariants = cva(
  "inline-flex items-center justify-center rounded-full shrink-0 mb-4",
  {
    variants: {
      variant: {
        default: "bg-primary/10 dark:bg-primary/15 text-primary",
        error: "bg-red-500/10 dark:bg-red-500/15 text-red-500",
        warning: "bg-amber-500/10 dark:bg-amber-500/15 text-amber-500",
        success: "bg-green-500/10 dark:bg-green-500/15 text-green-500",
        info: "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-500",
        question: "bg-pink-500/10 dark:bg-pink-500/15 text-pink-500",
      },
      size: {
        default: "size-9 [&>svg]:size-5",
        sm: "size-7 [&>svg]:size-5",
        lg: "size-11 [&>svg]:size-6",
        xl: "size-12 [&>svg]:size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function BadgeAlert({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeAlertVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeAlertVariants({ variant, size }), className)}
      {...props}
    >
      {variant === "error" ? (
        <CircleX />
      ) : variant === "warning" ? (
        <CircleAlert />
      ) : variant === "success" ? (
        <CircleCheck />
      ) : variant === "info" ? (
        <Info />
      ) : (
        <CircleHelp />
      )}
    </Comp>
  );
}

export { BadgeAlert, badgeAlertVariants };
