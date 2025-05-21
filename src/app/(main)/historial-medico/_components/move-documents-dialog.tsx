"use client";

import { Check, Loader } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/kit/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { folderColorClassMap, folderIconMap } from "../_lib/utils";

import type { Folder } from "@/lib/types";

interface MoveDocumentsDialogProps {
  ref: React.Ref<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
  onMove: (folderId: string) => void;
  folders: Folder[];
  isSubmitting: boolean;
  selectedCount: number;
}

const MoveDocumentsDialog = ({
  ref,
  isOpen,
  onClose,
  onMove,
  folders,
  isSubmitting,
  selectedCount,
}: MoveDocumentsDialogProps) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const title = `Mover ${selectedCount} ${selectedCount === 1 ? "elemento" : "elementos"}`;
  const description = `¿A qué carpeta quieres mover ${selectedCount} ${selectedCount === 1 ? "elemento" : "elementos"}?`;

  const content = (
    <div className="md:pt-6">
      <Command className="bg-transparent">
        <CommandInput placeholder="Buscar carpeta..." />
        <CommandList className="min-h-80 p-2">
          <CommandEmpty>No se encontraron carpetas.</CommandEmpty>
          {folders.map((folder) => {
            const color = folder.color ?? "gray";
            const icon = folder.icon ?? "folder";
            const { bg, text } = folderColorClassMap[color];
            const Icon = folderIconMap[icon];
            return (
              <CommandItem
                key={folder.id}
                onSelect={() => setSelectedFolder(folder.id)}
                className="cursor-pointer justify-between [&_svg:not([class*='text-'])]:text-current"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "dark:border-alternative mr-2 flex size-4 shrink-0 items-center justify-center rounded-[6px] border border-slate-300 p-1",
                      selectedFolder === folder.id
                        ? "bg-primary border-primary!"
                        : "opacity-50",
                    )}
                  >
                    {selectedFolder === folder.id && (
                      <Check className="text-primary-foreground size-3" />
                    )}
                  </div>
                  <span className="truncate">{folder.name}</span>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full p-1.5",
                    bg,
                    text,
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent ref={ref}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="p-4 text-center">
            {description}
          </DrawerDescription>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                variant="mobile"
                onClick={onClose}
                className="justify-center"
              >
                Cancelar
              </Button>
            </div>
            <Button
              disabled={isSubmitting || !selectedFolder}
              variant="mobile-primary"
              onClick={() => {
                if (selectedFolder) onMove(selectedFolder);
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Moviendo...
                </>
              ) : (
                "Mover"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={ref} isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full"
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting || !selectedFolder}
            onClick={() => {
              if (selectedFolder) onMove(selectedFolder);
            }}
            className="rounded-full"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Moviendo...
              </>
            ) : (
              "Mover"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveDocumentsDialog;
