import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/common";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2  dark:focus:ring-blue-600",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-main hover:bg-gray-100/80 dark:bg-dark dark:text-main-dark dark:hover:bg-dark/80",
        primary:
          "bg-bittersweet-400 hover:bg-bittersweet-400/80 dark:bg-cerise-red-600 dark:hover:bg-cerise-red-600/80 text-white",
        secondary:
          "bg-white text-main hover:bg-white/80 dark:bg-full-dark dark:text-main-dark dark:hover:bg-full-dark/80",
        destructive: "bg-danger hover:bg-danger/80 text-white",
        outline:
          "text-gray-950 dark:text-gray-50 border border-gray-200 dark:border-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
