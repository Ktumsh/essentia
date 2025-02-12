import * as React from "react";

import { cn } from "@/utils/common";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "placeholder:text-main-m focus-visible:ring-danger dark:border-accent-dark/50 dark:md:border-dark dark:placeholder:text-main-dark-m flex min-h-[60px] w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-base shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:rounded-md md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
