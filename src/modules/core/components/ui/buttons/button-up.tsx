"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useScrollToUp from "@/modules/core/hooks/use-scroll-to-up";
import { ArrowUpIcon } from "@/modules/icons/navigation";
import { cn } from "@/utils/common";

interface ButtonUpProps {
  scrollRef?: React.RefObject<HTMLElement | null>;
}

const ButtonUp = ({ scrollRef }: ButtonUpProps) => {
  const pathname = usePathname();

  const { isVisible, scrollToTop } = useScrollToUp(scrollRef);

  const essentiaAI = pathname === "/essentia-ai";

  return (
    <div
      id="button-up"
      className={cn(
        "fixed bottom-16 right-2 z-50 transition-opacity md:bottom-2",
        isVisible ? "opacity-100" : "opacity-0",
        essentiaAI && "hidden",
      )}
    >
      <Button
        id="scroll-to-top"
        aria-label="Volver al inicio de la página"
        size="icon"
        className={cn(
          "group flex !size-9 min-w-0 items-center justify-center rounded-md border border-gray-200 bg-white px-0 text-main shadow-md transition hover:scale-105 hover:border-bittersweet-400 hover:bg-white hover:text-bittersweet-400 hover:!opacity-100 hover:shadow-lg motion-safe:transition dark:border-white/10 dark:bg-dark dark:text-main-dark dark:hover:bg-full-dark",
          isVisible ? "cursor-pointer" : "cursor-default",
        )}
        onClick={scrollToTop}
      >
        <ArrowUpIcon className="size-4 rotate-0 transition-transform group-hover:rotate-0 md:rotate-45" />
      </Button>
    </div>
  );
};

export default ButtonUp;
