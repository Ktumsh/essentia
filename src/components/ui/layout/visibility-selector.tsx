"use client";

import { ChevronDown, ChevronsUpDown, Globe, Lock } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { useChatVisibility } from "@/hooks/use-chat-visibility";
import { cn } from "@/lib/utils";

import { CheckCircledIcon } from "../icons/common";

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
    icon: <Lock />,
  },
  {
    id: "public",
    label: "Público",
    description: "Cualquiera con el enlace puede acceder al chat",
    icon: <Globe />,
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
          "bg-accent md:bg-background dark:border-alternative/50 md:border-border text-foreground data-[state=open]:text-muted-foreground dark:data-[state=open]:bg-accent/50 data-[state=open]:bg-accent w-full md:w-auto",
          className,
        )}
      >
        <Button variant="outline" className="h-8 px-3">
          {selectedVisibility?.icon}
          {selectedVisibility?.label}
          {isMobile ? (
            <ChevronsUpDown className="ml-auto size-4" />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </DropdownMenuTrigger>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Visibilidad del chat</DrawerTitle>
              <DrawerDescription className="sr-only">
                Cambia la visibilidad del chat
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                {visibilities.map((visibility) => (
                  <DrawerClose key={visibility.id} asChild>
                    <Button
                      variant="mobile"
                      data-active={visibility.id === visibilityType}
                      onClick={() => {
                        setVisibilityType(visibility.id);
                        setOpen(false);
                      }}
                      className="group/item h-auto! justify-between"
                    >
                      <div className="flex flex-col items-start gap-1">
                        {visibility.label}
                        {visibility.description && (
                          <div className="text-muted-foreground text-xs">
                            {visibility.description}
                          </div>
                        )}
                      </div>
                      <div className="opacity-0 group-data-[active=true]/item:opacity-100">
                        <CheckCircledIcon className="text-primary size-5!" />
                      </div>
                    </Button>
                  </DrawerClose>
                ))}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenuContent align="start" className="max-w-[300px]">
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
                  <div className="text-muted-foreground text-xs">
                    {visibility.description}
                  </div>
                )}
              </div>
              <div className="opacity-0 group-data-[active=true]/item:opacity-100">
                <CheckCircledIcon className="text-primary" />
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
