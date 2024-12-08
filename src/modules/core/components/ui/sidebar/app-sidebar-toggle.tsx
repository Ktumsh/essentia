"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { SidebarFillIcon, SidebarIcon } from "@/modules/icons/navigation";

const AppSidebarToggle = () => {
  const pathname = usePathname();
  const { open: isOpen, toggleSidebar } = useSidebar();
  const isAiPage = pathname.startsWith("/essentia-ai");

  const tooltipContent = isOpen
    ? isAiPage
      ? "Ocultar historial de chat"
      : "Ocultar barra lateral"
    : isAiPage
      ? "Mostrar historial de chat"
      : "Mostrar barra lateral";

  return (
    <BetterTooltip content={tooltipContent} align="start">
      <Button
        variant="ghost"
        onClick={() => toggleSidebar()}
        className="size-9 text-main-h dark:text-main-dark-h"
      >
        {isOpen ? (
          <SidebarFillIcon aria-hidden="true" className="!size-5" />
        ) : (
          <SidebarIcon aria-hidden="true" className="!size-5" />
        )}
        <span className="sr-only">
          {isOpen ? "Ocultar historial de chat" : "Mostrar historial de chat"}
        </span>
      </Button>
    </BetterTooltip>
  );
};

export default AppSidebarToggle;
