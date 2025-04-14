"use client";

import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { startTransition, useMemo, useOptimistic, useState } from "react";

import { CHAT_MODELS } from "@/app/(main)/(chat)/_lib/ai/models";
import { saveChatModelAsCookie } from "@/app/(main)/(chat)/actions";
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
import { cn } from "@/lib/utils";

import { CheckCircledIcon } from "../icons/common";

export function ModelSelector({
  selectedModelId,
  className,
  isMobile = false,
}: {
  selectedModelId: string;
  isMobile?: boolean;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const selectedChatModel = useMemo(
    () => CHAT_MODELS.find((chatModel) => chatModel.id === optimisticModelId),
    [optimisticModelId],
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
          {selectedChatModel?.name}
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
              <DrawerTitle>Modelos de chat</DrawerTitle>
              <DrawerDescription className="sr-only">
                Cambia el modelo de chat
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                {CHAT_MODELS.map((chatModel) => {
                  const { id } = chatModel;
                  return (
                    <DrawerClose key={id} asChild>
                      <Button
                        variant="mobile"
                        data-active={id === optimisticModelId}
                        onClick={() => {
                          setOpen(false);
                          startTransition(() => {
                            setOptimisticModelId(id);
                            saveChatModelAsCookie(id);
                          });
                        }}
                        className="group/item h-auto! justify-between"
                      >
                        <div className="flex flex-col items-start gap-1 text-start">
                          <div>{chatModel.name}</div>
                          <div className="text-muted-foreground text-xs text-wrap">
                            {chatModel.description}
                          </div>
                        </div>
                        <div className="opacity-0 group-data-[active=true]/item:opacity-100">
                          <CheckCircledIcon className="text-primary size-5!" />
                        </div>
                      </Button>
                    </DrawerClose>
                  );
                })}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenuContent
          align={isMobile ? "start" : "end"}
          className="max-w-[300px]"
        >
          {CHAT_MODELS.map((chatModel) => {
            const { id } = chatModel;

            return (
              <DropdownMenuItem
                key={id}
                onSelect={() => {
                  setOpen(false);
                  startTransition(() => {
                    setOptimisticModelId(id);
                    saveChatModelAsCookie(id);
                  });
                }}
                className="group/item flex flex-row items-center justify-between gap-4"
                data-active={id === optimisticModelId}
              >
                <div className="flex flex-col items-start gap-1">
                  <div>{chatModel.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {chatModel.description}
                  </div>
                </div>

                <div className="opacity-0 group-data-[active=true]/item:opacity-100">
                  <CheckCircledIcon className="text-primary" />
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
