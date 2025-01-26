"use client";

import { ChevronDown, ChevronsUpDown, Globe, Lock } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircledIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";

import { useChatVisibility } from "../hooks/use-chat-visibility";

export type VisibilityType = "private" | "public";

const visibilities: Array<{
  id: VisibilityType;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: "private",
    label: "Privado",
    description: "Solo tú puedes acceder al chat",
    icon: <Lock strokeWidth={1.5} />,
  },
  {
    id: "public",
    label: "Público",
    description: "Cualquiera con el enlace puede acceder al chat",
    icon: <Globe strokeWidth={1.5} />,
  },
];

export function VisibilitySelector({
  chatId,
  className,
  selectedVisibilityType,
  isMobile = false,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isMobile?: boolean;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId,
    initialVisibility: selectedVisibilityType,
  });

  const selectedVisibility = useMemo(
    () => visibilities.find((visibility) => visibility.id === visibilityType),
    [visibilityType],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "w-full text-main data-[state=open]:bg-gray-100 data-[state=open]:text-main-m dark:text-main-dark dark:data-[state=open]:bg-dark/50 dark:data-[state=open]:text-main-dark-m md:w-auto",
          className,
        )}
      >
        <Button variant="outline" className="px-3">
          {selectedVisibility?.icon}
          {selectedVisibility?.label}
          {isMobile ? (
            <ChevronsUpDown className="ml-auto size-4" />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px]">
        {visibilities.map((visibility) => (
          <DropdownMenuItem
            key={visibility.id}
            onSelect={() => {
              setVisibilityType(visibility.id);
              setOpen(false);
            }}
            className="group/item flex flex-row items-center justify-between gap-4"
            data-active={visibility.id === visibilityType}
          >
            <div className="flex flex-col items-start gap-1">
              {visibility.label}
              {visibility.description && (
                <div className="text-xs text-muted-foreground">
                  {visibility.description}
                </div>
              )}
            </div>
            <div className="text-danger opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircledIcon className="!size-5" />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
