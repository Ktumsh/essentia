"use client";

import { cn } from "@/utils/common";
import { useSidebar } from "../hooks/use-sidebar";

export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(
        className,
        "h-full flex-col bg-white dark:bg-base-full-dark"
      )}
    >
      {children}
    </div>
  );
}
