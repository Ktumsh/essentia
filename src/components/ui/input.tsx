import * as React from "react";

import { cn } from "@/utils/common";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-main ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-main placeholder:text-main-m focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-full-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark dark:bg-full-dark dark:text-main-dark dark:ring-offset-full-dark dark:file:text-main-dark dark:placeholder:text-main-dark-m dark:focus-visible:ring-gray-300 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
