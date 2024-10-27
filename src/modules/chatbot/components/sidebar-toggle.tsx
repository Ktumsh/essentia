"use client";

import { Tooltip } from "@nextui-org/react";

import { SidebarFillIcon, SidebarIcon } from "@/modules/icons/navigation";
import { tooltipStyles } from "@/styles/tooltip-styles";

import { useSidebar } from "../hooks/use-sidebar";

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  const { isSidebarOpen } = useSidebar();

  return (
    <Tooltip
      content={
        isSidebarOpen
          ? "Ocultar historial de chat"
          : "Mostrar historial de chat"
      }
      delay={800}
      closeDelay={0}
      classNames={{
        content: tooltipStyles.content,
      }}
    >
      <button
        onClick={() => {
          toggleSidebar();
        }}
        className="h-10 rounded-lg px-2 text-main-h dark:text-main-dark-h hover:bg-gray-200 dark:hover:bg-full-dark transition-colors duration-150"
      >
        {isSidebarOpen ? (
          <SidebarFillIcon aria-hidden="true" />
        ) : (
          <SidebarIcon aria-hidden="true" />
        )}
        <span className="sr-only">
          {isSidebarOpen
            ? "Ocultar historial de chat"
            : "Mostrar historial de chat"}
        </span>
      </button>
    </Tooltip>
  );
};

export default SidebarToggle;
