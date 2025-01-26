"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/common";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    type="button"
    className={cn(
      "group/checkbox peer h-4 w-4 shrink-0 rounded-md border border-gray-200 bg-white shadow-sm transition-transform-colors-opacity focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-blue-600 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-danger data-[state=checked]:bg-danger data-[state=checked]:text-white dark:border-accent-dark dark:bg-full-dark dark:data-[state=checked]:border-danger dark:data-[state=checked]:bg-danger",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check strokeWidth={3} className="z-10 size-4 h-2 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
