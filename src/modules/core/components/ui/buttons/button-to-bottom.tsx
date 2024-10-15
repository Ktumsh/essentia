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
      radius="full"
      className={cn(
        "flex items-center justify-center !size-9 min-w-0 px-0 absolute -top-10 right-4 md:right-1/2 md:translate-x-1/2 data-[hover=true]:shadow-md text-base-color dark:text-base-color-dark data-[hover=true]:text-bittersweet-400 bg-white dark:bg-base-dark dark:data-[hover=true]:bg-base-full-dark border border-gray-300 dark:border-base-dark data-[hover=true]:border-bittersweet-400 data-[hover=true]:!opacity-100 !transition",
        isAtBottom ? "opacity-0" : "opacity-100"
      )}
      onPress={() => scrollToBottom()}
      {...props}
    >
      <ArrowUpIcon className="size-4 rotate-180 transition-transform" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};

export default ButtonToBottom;
