"use client";

import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowUpIcon } from "@/modules/icons/navigation";
import { cn } from "@/utils/common";

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const pathname = usePathname();
  const essentiaAI = pathname === "/essentia-ai";

  useEffect(() => {
    let timeout = 0;

    const handleScroll = () => {
      if (!timeout) {
        timeout = requestAnimationFrame(() => {
          const scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          setIsVisible(scrollTop > 20);
          timeout = 0;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) {
        cancelAnimationFrame(timeout);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        disableRipple
        className="group flex !size-9 min-w-0 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-0 text-main shadow-md transition hover:shadow-lg data-[hover=true]:scale-105 data-[hover=true]:border-bittersweet-400 data-[hover=true]:text-bittersweet-400 data-[hover=true]:!opacity-100 motion-safe:transition dark:border-white/10 dark:bg-dark dark:text-main-dark dark:data-[hover=true]:bg-full-dark"
        onClick={scrollToTop}
      >
        <ArrowUpIcon className="size-4 rotate-0 transition-transform group-data-[hover=true]:rotate-0 md:rotate-45" />
      </Button>
    </div>
  );
};

export default ButtonUp;
