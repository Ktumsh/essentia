"use client";

import { Command, Logs, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useIsMac } from "@/hooks/use-is-mac";
import { useIsMobile } from "@/hooks/use-mobile";

const AppSidebarToggle = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { open: isOpen, toggleSidebar } = useSidebar();
  const isAeris = pathname.startsWith("/aeris");

  const isMac = useIsMac();
  const isMobile = useIsMobile();

  let content = "";

  if (isAeris && session?.user) {
    content = isOpen
      ? "Ocultar historial de chat"
      : "Mostrar historial de chat";
  } else {
    content = isOpen ? "Ocultar barra lateral" : "Mostrar barra lateral";
  }

  return (
    <BetterTooltip
      side="bottom"
      content={
        <div className="inline-flex items-center">
          <span>{content}</span>
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
        data-testid="sidebar-toggle-button"
        size="icon"
        variant="ghost"
        onClick={() => toggleSidebar()}
        className="size-8"
      >
        {isAeris && isMobile ? (
          <Logs className="size-5!" />
        ) : (
          <MenuIcon className="size-5!" />
        )}
        <span className="sr-only">{content}</span>
      </Button>
    </BetterTooltip>
  );
};

export default AppSidebarToggle;
