import * as React from "react";

import { cn } from "@/utils/common";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { isAuth?: boolean }
>(({ className, type, isAuth, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-main placeholder:text-main-m focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-danger disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark dark:file:text-main-dark dark:placeholder:text-main-dark-m dark:focus-visible:ring-danger",
        isAuth &&
          "h-11 rounded-lg border-none bg-white shadow-none dark:bg-full-dark md:border md:bg-gray-100 dark:md:bg-dark/50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
