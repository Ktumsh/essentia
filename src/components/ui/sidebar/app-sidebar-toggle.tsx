"use client";

import { Command, MenuIcon, MessagesSquare } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/kit/button";
import { useSidebar } from "@/components/kit/sidebar";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsMac } from "@/hooks/use-is-mac";

const AppSidebarToggle = () => {
  const pathname = usePathname();
  const { open: isOpen, toggleSidebar } = useSidebar();
  const isAiPage = pathname.startsWith("/aeris");

  const isMac = useIsMac();

  const tooltipContent = isOpen
    ? isAiPage
      ? "Ocultar historial de chat"
      : "Ocultar barra lateral"
    : isAiPage
      ? "Mostrar historial de chat"
      : "Mostrar barra lateral";

  return (
    <BetterTooltip
      side="bottom"
      content={
        <div className="inline-flex items-center">
          <span>{tooltipContent}</span>
          <kbd className="pointer-events-none inline-flex items-center gap-1 px-1.5 text-xs select-none">
            <kbd className="bg-background text-xxs text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded px-1.5 font-medium opacity-100 select-none">
              {isMac ? (
                <span className="inline-flex items-center gap-1 font-mono">
                  <Command className="size-[9px]" />+ B
                </span>
              ) : (
                <span className="mt-px font-mono">Ctrl + B</span>
              )}
            </kbd>
            <span className="sr-only">
              Ctrl o Command + B para abrir la búsqueda rápida
            </span>
          </kbd>
        </div>
      }
      align="start"
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleSidebar()}
        className="size-8"
      >
        {isAiPage ? (
          <MessagesSquare className="size-5!" />
        ) : (
          <MenuIcon className="size-5!" />
        )}
        <span className="sr-only">
          {isOpen ? "Ocultar historial de chat" : "Mostrar historial de chat"}
        </span>
      </Button>
    </BetterTooltip>
  );
};

export default AppSidebarToggle;
