"use client";

import { Tooltip } from "@nextui-org/react";

import { tooltipStyles } from "@/styles/tooltip-styles";
import { useSidebar } from "../hooks/use-sidebar";
import { SidebarFillIcon, SidebarIcon } from "@/modules/icons/navigation";

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  const { isSidebarOpen } = useSidebar();

  return (
    <Tooltip
      content={
        isSidebarOpen ? "Ocultar barra lateral" : "Mostrar barra lateral"
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
        className="h-10 rounded-lg px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150"
      >
        {isSidebarOpen ? <SidebarFillIcon /> : <SidebarIcon />}
        <span className="sr-only">Toggle Sidebar</span>
      </button>
    </Tooltip>
  );
};

export default SidebarToggle;
