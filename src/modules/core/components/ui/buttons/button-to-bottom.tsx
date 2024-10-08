"use client";

import { FC } from "react";
import { Button } from "@nextui-org/react";
import { cn } from "@/utils/common";
import { ArrowUpIcon } from "@/modules/icons/navigation";

interface ButtonToBottomProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ButtonToBottom: FC<ButtonToBottomProps> = ({
  isAtBottom,
  scrollToBottom,
  ...props
}) => {
  return (
    <Button
      id="scroll-to-top"
      aria-label="Volver al inicio de la página"
      disableRipple
      className={cn(
        "flex items-center justify-center !size-9 min-w-0 px-0 absolute -top-10 sm:top-0 right-4 sm:right-8 rounded-md shadow-md hover:shadow-lg text-base-color dark:text-base-color-dark data-[hover=true]:text-bittersweet-400 bg-white dark:bg-base-dark dark:data-[hover=true]:bg-base-full-dark border border-gray-200 dark:border-white/10 data-[hover=true]:border-bittersweet-400 data-[hover=true]:scale-105 data-[hover=true]:!opacity-100 pointer-events-auto",
        isAtBottom ? "opacity-0" : "opacity-100"
      )}
      onPress={() => scrollToBottom()}
      {...props}
    >
      <ArrowUpIcon className="size-4 rotate-180 md:rotate-[135deg] group-data-[hover=true]:rotate-180 transition-transform" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};

export default ButtonToBottom;
