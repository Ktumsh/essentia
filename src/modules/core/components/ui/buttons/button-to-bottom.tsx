"use client";

import { Button } from "@nextui-org/react";
import { FC } from "react";

import { ArrowUpIcon } from "@/modules/icons/navigation";
import { cn } from "@/utils/common";

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
        "absolute -top-10 right-4 flex !size-9 min-w-0 items-center justify-center border border-gray-300 bg-white px-0 text-main !transition data-[hover=true]:border-bittersweet-400 data-[hover=true]:text-bittersweet-400 data-[hover=true]:!opacity-100 data-[hover=true]:shadow-md dark:border-dark dark:bg-dark dark:text-main-dark dark:data-[hover=true]:bg-full-dark md:right-1/2 md:translate-x-1/2",
        isAtBottom ? "opacity-0" : "opacity-100",
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
