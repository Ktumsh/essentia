"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useScrollToUp from "@/hooks/use-scroll-to-up";
import { cn } from "@/utils";

interface ButtonUpProps {
  scrollRef?: React.RefObject<HTMLElement | null>;
}

const ButtonUp = ({ scrollRef }: ButtonUpProps) => {
  const pathname = usePathname();

  const { isVisible, scrollToTop } = useScrollToUp(scrollRef);

  const isAeris = pathname === "/aeris";

  return (
    <div
      id="button-up"
      className={cn(
        "fixed right-4 bottom-2 z-50 transition-opacity",
        isVisible ? "opacity-100" : "opacity-0",
        isAeris && "hidden",
      )}
    >
      <Button
        aria-label="Volver al inicio de la página"
        size="icon"
        radius="full"
        className={cn(
          "group text-foreground hover:border-primary hover:text-primary dark:border-alternative bg-background hover:bg-background dark:hover:text-foreground size-9! min-w-0 border border-slate-300 px-0 hover:opacity-100! hover:shadow-md",
          isVisible ? "cursor-pointer" : "cursor-default",
        )}
        onClick={scrollToTop}
      >
        <ArrowUp className="size-4 rotate-0 transition-transform group-hover:rotate-0 md:rotate-45" />
        <span className="sr-only">Volver al inicio de la página</span>
      </Button>
    </div>
  );
};

export default ButtonUp;
