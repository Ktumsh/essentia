"use client";

import { ChevronDown } from "lucide-react";
import { startTransition, useMemo, useOptimistic, useState } from "react";

import { saveChatModelAsCookie } from "@/app/(main)/essentia-ai/chat/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircledIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";

import { CHAT_MODELS } from "../../ai/models";

export function ModelSelector({
  selectedModelId,
  className,
}: {
  selectedModelId: string;
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
          "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground w-fit",
          className,
        )}
      >
        <Button variant="outline" className="md:h-[34px] md:px-2">
          {selectedChatModel?.name}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-[300px]">
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
                <div className="text-main-m dark:text-main-dark-m text-xs">
                  {chatModel.description}
                </div>
              </div>

              <div className="text-danger opacity-0 group-data-[active=true]/item:opacity-100">
                <CheckCircledIcon />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
