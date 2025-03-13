"use client";

import { ArrowDown } from "lucide-react";

import { Button } from "@/components/kit/button";
import { cn } from "@/lib/utils";

interface ButtonToBottomProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ButtonToBottom = ({
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonToBottomProps) => {
  return (
    <Button
      aria-label="Ir al final del chat"
      radius="full"
      className={cn(
        "text-foreground/80 hover:border-primary hover:text-primary dark:border-alternative dark:hover:bg-background bg-background hover:bg-background dark:bg-accent absolute -top-12 right-4 size-9! min-w-0 border border-slate-300 px-0 hover:opacity-100! hover:shadow-md md:right-1/2 md:translate-x-1/2 dark:hover:text-white",
        isAtBottom ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      onClick={scrollToBottom}
      {...props}
    >
      <ArrowDown className="size-4" />
      <span className="sr-only">Ir al final del chat</span>
    </Button>
  );
};

export default ButtonToBottom;
