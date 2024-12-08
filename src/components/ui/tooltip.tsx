"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { type JSX } from "react";

import { cn } from "@/utils/common";

import { useIsMobile } from "../hooks/use-mobile";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, side, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    side={side}
    className={cn(
      "z-50 overflow-hidden rounded-full border border-gray-200 bg-white px-2 py-1 text-xs text-main shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-dark dark:bg-dark dark:text-main-dark",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

export const BetterTooltip = ({
  content,
  children,
  align = "center",
  side,
  className,
  hidden,
  ...props
}: React.ComponentPropsWithoutRef<typeof Tooltip> & {
  content: JSX.Element | string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  hidden?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          className={className}
          hidden={isMobile || hidden}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
