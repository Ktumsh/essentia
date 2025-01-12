"use client";

import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common";

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
      id="scroll-to-top"
      aria-label="Volver al inicio de la página"
      radius="full"
      className={cn(
        "absolute -top-10 right-4 !size-9 min-w-0 border border-gray-300 bg-white px-0 text-main hover:border-bittersweet-400 hover:bg-white hover:text-bittersweet-400 hover:!opacity-100 hover:shadow-md dark:border-accent-dark dark:bg-dark dark:text-main-dark dark:hover:bg-full-dark md:right-1/2 md:translate-x-1/2",
        isAtBottom ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      onClick={scrollToBottom}
      {...props}
    >
      <ArrowDown className="size-4" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};

export default ButtonToBottom;
