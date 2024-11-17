"use client";

import { cn } from "@/utils/common";

import { useSidebar } from "../hooks/use-sidebar";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "flex-col bg-white dark:bg-full-dark")}
    >
      {children}
    </div>
  );
}
