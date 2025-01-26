import * as React from "react";

import { cn } from "@/utils/common";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-main-m focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-danger disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark dark:placeholder:text-main-dark-m md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
