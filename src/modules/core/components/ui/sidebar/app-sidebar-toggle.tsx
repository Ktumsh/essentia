"use client";

import { usePathname } from "next/navigation";

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
      <button
        onClick={() => toggleSidebar()}
        className="h-10 rounded-lg px-2 text-main-h transition-colors duration-150 hover:bg-gray-200 dark:text-main-dark-h dark:hover:bg-dark"
      >
        {isOpen ? (
          <SidebarFillIcon aria-hidden="true" />
        ) : (
          <SidebarIcon aria-hidden="true" />
        )}
        <span className="sr-only">
          {isOpen ? "Ocultar historial de chat" : "Mostrar historial de chat"}
        </span>
      </button>
    </BetterTooltip>
  );
};

export default AppSidebarToggle;
